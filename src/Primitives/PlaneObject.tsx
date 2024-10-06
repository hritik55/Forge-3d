import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function PlaneObject({
  handleObjectSelect,
  wireframe = false,
}: {
  handleObjectSelect: () => null;
  wireframe?: boolean;
}) {
  const { camera, gl } = useThree();
  const meshRef = useRef(null);
  const dotsRef = useRef([]);
  const [mouse, setMouse] = useState(new THREE.Vector2());
  const raycaster = new THREE.Raycaster();

  const [hovered, hover] = useState(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Convert mouse position to normalized device coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse(new THREE.Vector2(x, y));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      // Update the raycaster with the camera and mouse position
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(meshRef.current.children);

      // Handle intersections
      if (intersects.length > 0) {
        console.log("Intersected objects:", intersects);
      }

      const positions = meshRef.current.geometry.attributes.position.array;
      const updatedPositions = [];
      for (let i = 0; i < positions.length; i += 3) {
        const vertex = new THREE.Vector3(
          positions[i],
          positions[i + 1],
          positions[i + 2]
        );
        vertex.applyMatrix4(meshRef.current.matrixWorld);
        updatedPositions.push(vertex);
      }
      //console.log("Updated vertex positions", updatedPositions);
    }
  }, []);
  useEffect(() => {
    const geometry = new THREE.BufferGeometry();

    const vertices = new Float32Array([
      -1.0,
      1.0,
      0.0, //top-left
      1.0,
      1.0,
      0.0, //top-right
      -1.0,
      -1.0,
      0.0, //bottom-left
      1.0,
      -1.0,
      0.0, //bottom-right
    ]);

    const indices = [
      0,
      2,
      1, // first-triangle
      2,
      3,
      1, //second-triangle
    ];

    geometry.setIndex(indices);
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    if (meshRef.current) {
      meshRef.current.geometry = geometry;
    }

    const dotGeometry = new THREE.SphereGeometry(0.02, 5, 5);
    const dotMaterial = new THREE.MeshBasicMaterial({ color: "orange" });

    for (let i = 0; i < vertices.length; i += 3) {
      const dot = new THREE.Mesh(dotGeometry, dotMaterial);
      dot.position.set(vertices[i], vertices[i + 1], vertices[i + 2]);
      dotsRef.current.push(dot);
      meshRef.current.add(dot);
    }
  }, []);

  return (
    <mesh
      ref={meshRef}
      onClick={handleObjectSelect}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <meshStandardMaterial
        color="blue"
        side={THREE.DoubleSide}
        wireframe={wireframe}
      />
    </mesh>
  );
}

export default PlaneObject;
