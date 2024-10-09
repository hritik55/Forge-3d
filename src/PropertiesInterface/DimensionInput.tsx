import React from "react";

function DimensionInput({
  label,
  selectedObject,
  transformProperty,
}: {
  label: string;
}) {
  return (
    <div className="control-item">
      <label>{label}</label>
      <div className="dimensions">
        <div className="control-dimension">
          <span>X</span>
          <input
            type="text"
            value={Math.round(selectedObject?.[transformProperty].x)}
          />
        </div>
        <div className="control-dimension">
          <span>Y</span>
          <input
            type="text"
            value={Math.round(selectedObject?.[transformProperty].y)}
          />
        </div>
        <div className="control-dimension">
          <span>Z</span>
          <input
            type="text"
            value={Math.round(selectedObject?.[transformProperty].z)}
          />
        </div>
      </div>
    </div>
  );
}

export default DimensionInput;
