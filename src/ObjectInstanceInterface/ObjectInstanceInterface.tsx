import React, { useState, useEffect } from "react";
import "./ObjectInstanceInterface.scss";
import { generateUUID } from "three/src/math/MathUtils.js";
import { useInterfaceContext } from "../context/interfaceContext";
import Menu from "../components/common/PopMenu/Menu";
import Button from "../components/common/Button/Button";

function ObjectInstanceInterface({ objectList, setObjectList }) {
  const { setInterfaceState } = useInterfaceContext();
  const [isMenuColapsed, setIsMenuColapsed] = useState(false);
  const buttonsConfig = [
    {
      label: "Cube",
      icon: "Cube",
      handleClick: () =>
        setObjectList((prev) => {
          return {
            ...prev,
            cubes: [...prev.cubes, { id: generateUUID() }],
          };
        }),
    },
    {
      label: "Sphere",
      icon: "Sphere",
      handleClick: () =>
        setObjectList((prev) => {
          return {
            ...prev,
            spheres: [...prev.spheres, { id: generateUUID() }],
          };
        }),
    },
    {
      label: "Plane",
      icon: "Plane",
      handleClick: () =>
        setObjectList((prev) => {
          return {
            ...prev,
            planes: [...prev.planes, { id: generateUUID() }],
          };
        }),
    },
  ];

  useEffect(() => {
    if (objectList.planes.length !== 0) {
      setInterfaceState({ isCanvasEmpty: false });
    } else {
      setInterfaceState({ isCanvasEmpty: true });
    }
  }, [objectList]);

  useEffect(() => {
    console.log(objectList);
  }, [objectList]);
  return (
    <div className="interface-container">
      <Button
        label={"Create object"}
        iconName={"Cube"}
        onClick={() =>
          setIsMenuColapsed((prev) => {
            return !prev;
          })
        }
        active={true}
      />
      <Menu
        config={buttonsConfig}
        toggleCollapsed={isMenuColapsed}
        setToggleCollapsed={setIsMenuColapsed}
      />
    </div>
  );
}

export default ObjectInstanceInterface;
