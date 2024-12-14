import { useState, useEffect } from "react";
import "./App.css";
import { easing } from "maath";
import { Canvas, ThreeEvent, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Bvh, Select } from "@react-three/drei";
import RotatingCube from "./components/common/RotatingCube";
import Axes from "./components/Axes";
import Grid from "./components/Grid";
import PropertiesInterface from "./PropertiesInterface/PropertiesInterface";
import * as THREE from "three";
import MovementControls from "./MovementControls";
import ArrowHelper from "./components/ArrowHelper";
// import Outline from "./components/Outline";
import Plane from "./Primitives/PlaneObject";
import ObjectInstanceInterface from "./ObjectInstanceInterface/ObjectInstanceInterface";
import {
  EffectComposer,
  Selection,
  Outline,
  N8AO,
  TiltShift2,
  ToneMapping,
} from "@react-three/postprocessing";
import TransformControls from "./components/TransformControls";
import MoveRotateScale from "./TransformControlInterface/TransformControlInterface";
import { InterfaceProvider } from "./context/interfaceContext";
import Cube from "./Primitives/Cube";
import SphereObject from "./Primitives/SphereObject";

function App() {
  const [selectedObject, setSelectedObject] =
    useState<THREE.Object3D<THREE.Object3DEventMap> | null>(null);
  const [isMoving, setIsMoving] = useState(false);
  const [objectList, setObjectList] = useState({
    planes: [],
    cubes: [],
    spheres: [],
  });
  const [mode, setMode] = useState("translate");
  const [wireframe, setWireframe] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedObject) {
        switch (event.key) {
          case "ArrowUp":
            selectedObject.position.y += 1 * 5;
            break;
          case "ArrowDown":
            selectedObject.position.y -= 1 * 5;
            break;
          case "ArrowLeft":
            selectedObject.position.x -= 1 * 5;
            break;
          case "ArrowRight":
            selectedObject.position.x += 1 * 5;
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedObject]);

  const handleObjectSelect = (obj: ThreeEvent<MouseEvent>) => {
    setSelectedObject(obj.eventObject);
  };

  return (
    <InterfaceProvider>
      <PropertiesInterface selectedObject={selectedObject} />
      <ObjectInstanceInterface
        objectList={objectList}
        setObjectList={setObjectList}
      />
      <MoveRotateScale
        setMode={setMode}
        wireframeMode={wireframe}
        setWireframeMode={setWireframe}
      />
      <Canvas
        gl={{ antialias: true }}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        {/* <Sky /> */}
        <color attach="background" args={["#3a3b3d"]} />{" "}
        {/* Change the color code here */}
        <directionalLight
          position={[1, 1, 1]}
          intensity={10}
          color={0x9cdba6}
        />
        <OrbitControls
          enableZoom
          enableRotate={!selectedObject}
          enablePan={!selectedObject}
          enableDamping
          dampingFactor={0.05}
          maxZoom={2} // Set the upper limit for zoom here
          maxDistance={55}
        />
        <MovementControls
          selectedObject={selectedObject}
          setSelectedObject={setSelectedObject}
          isMoving={isMoving}
          setIsMoving={setIsMoving}
        />
        <Grid />
        <Axes />
        {/* <RotatingCube handleObjectSelect={handleObjectSelect} /> */}
        {selectedObject && <ArrowHelper selectedObject={selectedObject} />}
        {selectedObject && (
          <TransformControls selectedObject={selectedObject} mode={mode} />
        )}
        <Selection>
          <Effects />
          {objectList.planes.map((plane, idx) => {
            return (
              <Select>
                <Plane
                  key={plane.id}
                  handleObjectSelect={handleObjectSelect}
                  wireframe={wireframe}
                />
              </Select>
            );
          })}
          {objectList.cubes.map((cube) => {
            return (
              <Select>
                <Cube
                  key={cube.id}
                  //handleObjectSelect={handleObjectSelect}
                  wireframe={wireframe}
                />
              </Select>
            );
          })}
          {objectList.spheres.map((sphere) => {
            return (
              <Select>
                <SphereObject
                  key={sphere.id}
                  //handleObjectSelect={handleObjectSelect}
                  wireframe={wireframe}
                />
              </Select>
            );
          })}
        </Selection>
      </Canvas>
    </InterfaceProvider>
  );
}

function Effects() {
  const { size } = useThree();
  // useFrame((state, delta) => {
  //   easing.damp3(
  //     state.camera.position,
  //     [
  //       state.pointer.x,
  //       1 + state.pointer.y / 2,
  //       8 + Math.atan(state.pointer.x * 2),
  //     ],
  //     0.3,
  //     delta
  //   );
  //   state.camera.lookAt(state.camera.position.x * 0.9, 0, -4);
  // });
  return (
    <EffectComposer
      stencilBuffer
      disableNormalPass
      autoClear={false}
      multisampling={8}
    >
      {/* <N8AO
        halfRes
        aoSamples={5}
        aoRadius={0.4}
        distanceFalloff={0.75}
        intensity={1}
      /> */}
      <Outline
        visibleEdgeColor="white"
        hiddenEdgeColor="white"
        blur
        width={1000}
        edgeStrength={100}
      />
      {/* <TiltShift2 samples={5} blur={0.1} />
      <ToneMapping /> */}
    </EffectComposer>
  );
}

export default App;
