import type { ButtonProps } from "./Button.types";
import "./Button.styles.scss";

function Button({
  children,
  className,
  size = "md",
  fullWidth = false,
  variant = "primary",
  ...attributes
}: React.PropsWithChildren<ButtonProps>) {
  const classes =
    `btn btn-${variant} btn-${size} ${className || ""} ${fullWidth ? "full-width" : ""}`.trim();

  return (
    <button {...attributes} className={classes}>
      {children}
    </button>
  );
}
export default Button;
