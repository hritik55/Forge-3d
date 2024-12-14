import "./Button.scss";
import Icon from "../Icon/Icon";
type buttonProps = {
  iconName?: string;
  label: string;
  onClick: () => void;
  variant?: string;
  title?: string;
  children?: React.ReactNode;
  active: boolean;
};

function Button({
  label,
  iconName,
  onClick,
  variant = "",
  title,
  children,
  active,
}: buttonProps) {
  return (
    <button
      className={`btn ${iconName ? "iconButton" : ""} ${variant} ${
        active ? "active" : ""
      }`}
      title={title || label}
      onClick={onClick}
      aria-label={title || label}
    >
      {iconName ? (
        <>
          <Icon type={iconName} />
          <span>{title}</span>
        </>
      ) : (
        <span>{title}</span>
      )}
      {children}
    </button>
  );
}

export default Button;
