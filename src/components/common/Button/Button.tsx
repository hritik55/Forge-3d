import "./Button.scss";
type buttonProps = {
  iconId: string;
  label: string;
  onClick: () => void;
  variant?: string;
  title?: string;
  children?: React.ReactNode;
};

function Button({
  label,
  iconId,
  onClick,
  variant = "",
  title,
  children,
}: buttonProps) {
  return (
    <button
      className={`btn ${iconId && "iconButton"} ${variant}`}
      title={title || label}
      onClick={onClick}
      aria-label={title || label}
    >
      {title && title}
      {iconId && (
        <svg
          className="icon"
          viewBox="0 0 645 645"
        
          fill="#fff"
         
        >
          <use xlinkHref={`AppIcons.svg#${iconId}`} />
        </svg>
      )}
      {children}
    </button>
  );
}

export default Button;
