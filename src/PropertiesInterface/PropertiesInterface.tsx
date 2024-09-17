import React, { useEffect } from "react";
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
            <label>Position</label>
            <input type="text" value={selectedObject?.position.x} />
          </div>
          <div className="control-panel-item">
            <label>Rotation</label>
            <input type="text" />
          </div>
          <div className="control-panel-item">
            <label>Scale</label>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesInterface;
