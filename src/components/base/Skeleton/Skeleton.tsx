import type { Props } from "./Skeleton.types";
import "./Skeleton.styles.scss";

function Skeleton({ className, role, ...props }: Props) {
  return (
    <div
      {...props}
      role={`progressbar ${role || ""}`.trim()}
      className={`skeleton ${className || ""}`.trim()}></div>
  );
}

export default Skeleton;
