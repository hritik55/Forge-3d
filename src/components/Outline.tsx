import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree, extend, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";

extend({ EffectComposer, RenderPass, OutlinePass, ShaderPass });

function Outline({ selectedObject }) {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();
  const outlinePass = useRef();

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    outlinePass.current = new OutlinePass(
      new THREE.Vector2(size.width, size.height),
      scene,
      camera
    );
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms["resolution"].value.set(
      1 / size.width,
      1 / size.height
    );

    // Set the outline color
    outlinePass.current.visibleEdgeColor.set("#ff0000"); // Red color for visible edges
    outlinePass.current.hiddenEdgeColor.set("#000000"); // Black color for hidden edges

    composer.current.addPass(renderPass);
    composer.current.addPass(outlinePass.current);
    composer.current.addPass(effectFXAA);
  }, [gl, scene, camera, size]);

  useEffect(() => {
    if (selectedObject && outlinePass.current) {
      outlinePass.current.selectedObjects = [selectedObject];
    }
  }, [selectedObject]);

  useFrame(() => {
    if (composer.current) {
      composer.current.render();
    }
  }, 1);

  return null;
}

export default Outline;
