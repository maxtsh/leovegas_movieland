import { forwardRef } from "react";
import type { InputProps } from "./Input.types";
import "./Input.styles.scss";

const Input = forwardRef<HTMLInputElement, InputProps>(function InputComponent(
  { className, fullWidth = false, ...attributes },
  ref,
) {
  const classes =
    `input ${className || ""} ${fullWidth ? "full-width" : ""}`.trim();

  return <input ref={ref} {...attributes} className={classes} />;
});

export default Input;
