import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import * as THREE from "three";

function RotatingCube({ handleObjectSelect }) {
  const meshRef = useRef<THREE.Mesh>();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={meshRef} onClick={handleObjectSelect}>
      <cylinderGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color="#468585" emissive="#468585" />
    </mesh>
  );
}

export default RotatingCube;
