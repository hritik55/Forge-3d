import React, { useEffect } from "react";
import DimensionInput from "./DimensionInput";
import "./PropertiesInterface.scss";

function PropertiesInterface({ selectedObject }) {
  useEffect(() => {
    if (selectedObject) {
      console.log(selectedObject.position.x);
    }
  }, [selectedObject]);
  return (
    <div className="control-container">
      <div className="control-panel">
        <div className="control-panel-header">Properties</div>
        <div className="control-panel-body">
          <div className="control-panel-item">
            <DimensionInput
              label={"Position"}
              selectedObject={selectedObject}
              transformProperty={"position"}
            />
            <DimensionInput
              label={"Rotation"}
              selectedObject={selectedObject}
              transformProperty={"rotation"}
            />
            <DimensionInput
              label={"Scale"}
              selectedObject={selectedObject}
              transformProperty={"scale"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesInterface;
