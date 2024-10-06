import { useRef } from "react";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";
import { AXES_LENGTH } from "../utils/constants";

function Axes() {
  const axisRef = useRef();
  const xAxisPoints = [
    new THREE.Vector3(-AXES_LENGTH, 0, 0),
    new THREE.Vector3(AXES_LENGTH, 0, 0),
  ];
  const yAxisPoints = [
    new THREE.Vector3(0, AXES_LENGTH, 0),
    new THREE.Vector3(0, -AXES_LENGTH, 0),
  ];
  const zAxisPoints = [
    new THREE.Vector3(0, 0, AXES_LENGTH),
    new THREE.Vector3(0, 0, -AXES_LENGTH),
  ];
  return (
    <mesh>
      <Line points={xAxisPoints} color="red" lineWidth={2} />;
      <Line points={yAxisPoints} color="green" lineWidth={2} />;
      <Line points={zAxisPoints} color="blue" lineWidth={2} />;
      {/* <Html position={[0, 0, 0]}>
        <div style={{ color: "black", fontSize: "20px" }}>(0,0)</div>
      </Html> */}
    </mesh>
  );
}

export default Axes;
