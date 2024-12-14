import { Sphere } from "@react-three/drei";
import * as THREE from "three";

function SphereObject({ wireframe = false }) {
  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial
        color="blue"
        side={THREE.DoubleSide}
        wireframe={wireframe}
      />
    </Sphere>
  );
}

export default SphereObject;
