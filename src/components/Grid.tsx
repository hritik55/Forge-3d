import React from "react";
import { Line } from "@react-three/drei";
import { AXES_LENGTH } from "../utils/constants";
import * as THREE from "three";
function Grid() {
  const generatePoints = (axis: string): THREE.Vector3[][] => {
    const points = [];
    const step = 5;
    switch (axis) {
      case "x":
        for (let i = AXES_LENGTH; i >= -AXES_LENGTH; i -= step) {
          points.push([
            new THREE.Vector3(AXES_LENGTH, 0, i),
            new THREE.Vector3(-AXES_LENGTH, 0, i),
          ]);
          points.push([
            new THREE.Vector3(i, 0, AXES_LENGTH),
            new THREE.Vector3(i, 0, -AXES_LENGTH),
          ]);
          //   for (let j = AXES_LENGTH; j > -AXES_LENGTH; j -= step) {
          //     points.push([
          //       new THREE.Vector3(AXES_LENGTH, j, i),
          //       new THREE.Vector3(-AXES_LENGTH, j, i),
          //     ]);
          //   }
        }
        break;
      case "y":
        for (let i = AXES_LENGTH; i >= -AXES_LENGTH; i -= step) {
          points.push([
            new THREE.Vector3(i, AXES_LENGTH, 0),
            new THREE.Vector3(i, -AXES_LENGTH, 0),
          ]);
          points.push([
            new THREE.Vector3(AXES_LENGTH, i, 0),
            new THREE.Vector3(-AXES_LENGTH, i, 0),
          ]);
          //   for (let j = AXES_LENGTH; j > -AXES_LENGTH; j -= step) {
          //     points.push([
          //       new THREE.Vector3(i, AXES_LENGTH, j),
          //       new THREE.Vector3(i, -AXES_LENGTH, j),
          //     ]);
          //   }
        }
        break;
      case "z":
        for (let i = AXES_LENGTH; i >= -AXES_LENGTH; i -= step) {
          points.push([
            new THREE.Vector3(0, i, AXES_LENGTH),
            new THREE.Vector3(0, i, -AXES_LENGTH),
          ]);
          points.push([
            new THREE.Vector3(0, AXES_LENGTH, i),
            new THREE.Vector3(0, -AXES_LENGTH, i),
          ]);
          //   for (let j = AXES_LENGTH; j > -AXES_LENGTH; j -= step) {
          //     points.push([
          //       new THREE.Vector3(j, i, AXES_LENGTH),
          //       new THREE.Vector3(j, i, -AXES_LENGTH),
          //     ]);
          //   }
        }
        break;
      default:
        return [];
    }
    return points;
  };
  return (
    <mesh>
      {generatePoints("x").map((points, index) => {
        return (
          <Line
            key={`x-${index}`}
            points={points}
            color={"grey"}
            lineWidth={1}
          />
        );
      })}
      {/* {generatePoints("y").map((points) => {
        return <Line points={points} color={"grey"} lineWidth={0.5} />;
      })}
      {generatePoints("z").map((points) => {
        return <Line points={points} color={"grey"} lineWidth={0.5} />;
      })} */}
    </mesh>
  );
}

export default Grid;
