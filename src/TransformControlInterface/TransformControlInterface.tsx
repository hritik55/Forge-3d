import { useEffect } from "react";
import "./TransformControllerInterface.scss";
import Button from "../components/common/Button/Button";
import { useLanguage } from "../context/languageContext";
import { objectTransformModes, objectViewModes } from "../utils/constants";
import Icon from "../components/common/Icon/Icon";

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
    { op: objectTransformModes.TRANSLATE, controlTitle: "Translate" },
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
              iconName={config.controlTitle}
              onClick={() => setMode(config.op)}
            />
          );
        })}
      </div>
      <div className="solid_panel">
        <Button
          key="solid_btn"
          label="Wireframe"
          iconName="Wireframe"
          onClick={() => setWireframeMode(!wireframeMode)}
        ></Button>
        <Button
          key="solid_btn"
          label="Solid"
          iconName="Solid"
          onClick={() => setWireframeMode(!wireframeMode)}
        ></Button>
      </div>
    </>
  );
}

export default TransformControlInterface;
