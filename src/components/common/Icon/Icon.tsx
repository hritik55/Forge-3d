import { getViewBox } from "../../../utils/utils";
import "./Icon.scss";
interface IconProps {
  type: string;
}

const Icon = ({ type }: IconProps) => {
  const viewBox = getViewBox(type);

  return (
    <svg
      className="icon"
      width={"100%"}
      height={"auto"}
      overflow={"hidden"}
      viewBox={viewBox}
    >
      <use xlinkHref={`/AppIcons2.svg#${type}`} />
    </svg>
  );
};

export default Icon;
