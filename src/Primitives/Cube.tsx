import React, { useRef } from "react";
import * as THREE from "three";

function Cube() {
  const meshRef = useRef<THREE.Mesh>(null);
  return (
    <mesh ref={meshRef}>
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

export default Cube;
