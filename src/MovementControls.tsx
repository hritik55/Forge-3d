import React, { SetStateAction, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

function MovementControls({
  selectedObject,
  setSelectedObject,
  isMoving,
  setIsMoving,
}: {
  selectedObject: THREE.Object3D<THREE.Object3DEventMap>;
  setSelectedObject: React.Dispatch<
    SetStateAction<THREE.Object3D<THREE.Object3DEventMap>>
  >;
  isMoving: boolean;
  setIsMoving: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { camera } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      if (isMoving && selectedObject) {
        // Convert 2D screen coordinates to normalized device coordinates (NDC)
        const ndcX = (event.clientX / window.innerWidth) * 2 - 1;
        const ndcY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Create a vector in NDC space
        const vector = new THREE.Vector3(ndcX, ndcY, 0.5);

        // Unproject the vector to 3D world coordinates
        vector.unproject(camera);

        // Create a raycaster from the camera through the vector
        const raycaster = new THREE.Raycaster(
          camera.position,
          vector.sub(camera.position).normalize()
        );

        // Create a plane parallel to the camera's view direction
        const plane = new THREE.Plane(
          new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion),
          0
        );

        // Get the intersection point of the ray with the plane
        const intersection = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, intersection);

        // Update the position of the selected object
        selectedObject.position.copy(intersection);

        // // Unproject the vector to 3D world coordinates
        // vector.unproject(camera);

        // // Calculate the direction from the camera to the vector
        // const dir = vector.sub(camera.position).normalize();

        // // Calculate the distance from the camera to the plane at z = 0
        // const distance = -camera.position.z / dir.z;

        // // Calculate the new position in 3D space
        // const newPosition = camera.position
        //   .clone()
        //   .add(dir.multiplyScalar(distance));

        // Update the position of the selected object
        //selectedObject.position.copy(newPosition);
      }
    };

    const handleMouseUp = () => {
      if (isMoving) {
        setIsMoving(false);
        setSelectedObject(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selectedObject, isMoving, camera]);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "g" && selectedObject) {
      setIsMoving(true);
    }
  };

  return null;
}

export default MovementControls;
