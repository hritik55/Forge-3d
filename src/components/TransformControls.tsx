import React, { useRef, useEffect } from "react";
import { extend, useThree } from "@react-three/fiber";
import { TransformControls as ThreeTransformControls } from "three/addons/controls/TransformControls.js";
import * as THREE from "three";

extend({ TransformControls: ThreeTransformControls });

function TransformControls({
  selectedObject,
  mode,
}: {
  selectedObject: THREE.Object3D<THREE.Object3DEventMap>;
  mode: string;
}) {
  const transformRef = useRef();
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;
      controls.attach(selectedObject);
      scene.add(controls);

      // const onChange = () => {
      //   console.log(
      //     "Object transformed",
      //     selectedObject.position,
      //     selectedObject.rotation,
      //     selectedObject.scale
      //   );
      // };

      // controls.addEventListener("change", onChange);
      return () => {
        //controls.removeEventListener("change", onChange);
        scene.remove(controls);
      };
    }
  }, [selectedObject, scene]);
  useEffect(() => {
    if (transformRef.current) {
      const controls = transformRef.current;
      controls.setMode(mode); // Set the mode based on the prop
    }
  }, [mode]);

  return (
    <transformControls ref={transformRef} args={[camera, gl.domElement]} />
  );
}

export default TransformControls;
