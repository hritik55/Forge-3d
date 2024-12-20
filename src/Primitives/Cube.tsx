import { Box } from "@react-three/drei";
import * as THREE from "three";

function Cube({ wireframe = false }) {
  return (
    <Box args={[1, 1, 1]}>
      <meshStandardMaterial
        color="blue"
        side={THREE.DoubleSide}
        wireframe={wireframe}
      />
    </Box>
  );
}

export default Cube;
