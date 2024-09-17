import { useState, useEffect } from "react";
import "./App.css";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RotatingCube from "./components/common/RotatingCube";
import Axes from "./components/Axes";
import Grid from "./components/Grid";
import PropertiesInterface from "./PropertiesInterface/PropertiesInterface";
import * as THREE from "three";
import MovementControls from "./MovementControls";
import ArrowHelper from "./components/ArrowHelper";
import Outline from "./components/Outline";
import Plane from "./Primitives/Plane";
import ObjectInstanceInterface from "./ObjectInstanceInterface/ObjectInstanceInterface";

function App() {
  const [selectedObject, setSelectedObject] =
    useState<THREE.Object3D<THREE.Object3DEventMap>>();
  const [isMoving, setIsMoving] = useState(false);
  const [objectList, setObjectList] = useState({ planes: [] });

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
    console.log(obj.eventObject);
    setSelectedObject(obj.eventObject);
  };

  return (
    <>
      <PropertiesInterface selectedObject={selectedObject} />
      <ObjectInstanceInterface
        objectList={objectList}
        setObjectList={setObjectList}
      />
      <Canvas
        gl={{ antialias: true }}
        style={{
          height: "100vh",
          width: "90vw",
          display: "flex",
          justifyContent: "content",
          alignItems: "center",
        }}
      >
        <color attach="background" args={["#CFCFCF"]} />{" "}
        {/* Change the color code here */}
        <directionalLight
          position={[1, 1, 1]}
          intensity={10}
          color={0x9cdba6}
        />
        <OrbitControls
          enableZoom
          enableRotate
          enablePan
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
        <Outline selectedObject={selectedObject} />
        {objectList.planes.map((plane, idx) => {
          return (
            <Plane
              key={plane.planeId}
              handleObjectSelect={handleObjectSelect}
            />
          );
        })}
      </Canvas>
    </>
  );
}

export default App;
