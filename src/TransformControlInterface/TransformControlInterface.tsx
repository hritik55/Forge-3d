import { useEffect } from "react";
import "./TransformControllerInterface.scss";
import Button from "../components/common/Button/Button";
import { useLanguage } from "../context/languageContext";
import { objectTransformModes, objectViewModes } from "../utils/constants";

interface TransformControlInterfaceProps {
  setMode: (mode: string) => void;
  wireframeMode: boolean;
  setWireframeMode: (mode: boolean) => void;
}

function TransformControlInterface({
  setMode,
  wireframeMode,
  setWireframeMode,
}: TransformControlInterfaceProps) {
  const { labels } = useLanguage();

  useEffect(() => {
    console.log(labels);
  }, [labels]);
  const transformConfig = [
    { op: objectTransformModes.TRANSLATE, controlTitle: "Move" },
    { op: objectTransformModes.ROTATE, controlTitle: "Rotate" },
    { op: objectTransformModes.SCALE, controlTitle: "Scale" },
  ];
  return (
    <>
      <div className="transform-buttons-container">
        {transformConfig.map((config, idx) => {
          return (
            <Button
              key={`${config.op}_${idx}`}
              label={config.controlTitle}
              iconId={config.controlTitle}
              onClick={() => setMode(config.op)}
            />
          );
        })}
      </div>
      <div>
        <button onClick={() => setWireframeMode(!wireframeMode)}>
          {wireframeMode ? objectViewModes.SOLID : objectViewModes.WIREFRAME}
        </button>
      </div>
    </>
  );
}

export default TransformControlInterface;
