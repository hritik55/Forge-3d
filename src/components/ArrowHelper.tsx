import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

function ArrowHelper({ selectedObject }) {
  const arrowRef = useRef();
  //const { scene } = useThree();

  useEffect(() => {
    if (selectedObject && arrowRef.current) {
      console.log(selectedObject.position);
      const direction = new THREE.Vector3(0, 0, 0)
        .subVectors(selectedObject.position, new THREE.Vector3(0, 0, 0))
        .normalize();

      arrowRef.current.setDirection(direction);
      arrowRef.current.setLength(selectedObject.position.length());
      arrowRef.current.position.set(0, 0, 0);
    }
  }, [selectedObject.position]);

  return (
    <arrowHelper
      ref={arrowRef}
      args={[
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        1,
        0xff0000,
      ]}
    />
  );
}

export default ArrowHelper;
