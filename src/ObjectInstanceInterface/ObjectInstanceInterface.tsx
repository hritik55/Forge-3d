import React, { useEffect } from "react";
import { generateUUID } from "three/src/math/MathUtils.js";

function ObjectInstanceInterface({ objectList, setObjectList }) {
  useEffect(() => {
    console.log(objectList);
  }, [objectList]);
  return (
    <div className="interface-container">
      <button
        onClick={() =>
          setObjectList((prev) => {
            return {
              ...prev,
              planes: [...prev.planes, { planeId: generateUUID() }],
            };
          })
        }
      >
        Plane
      </button>
    </div>
  );
}

export default ObjectInstanceInterface;
