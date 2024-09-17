import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function Plane({ handleObjectSelect }) {
  const meshRef = useRef(null);

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
      0.0,
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
  }, []);
  return (
    <mesh ref={meshRef} onClick={handleObjectSelect}>
      <meshStandardMaterial color="blue" side={THREE.DoubleSide} />
    </mesh>
  );
}

export default Plane;
