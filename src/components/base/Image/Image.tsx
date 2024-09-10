import { useState, memo } from "react";
import Skeleton from "@/components/base/Skeleton";
import NotFound from "@/assets/not-found-500X750.jpeg";
import type { Props, ImageStatus } from "./Image.types";
import "./Image.styles.scss";

const Image: React.FC<Props> = ({
  src,
  width,
  height,
  Fallback,
  loadingStyles,
  className,
  ...props
}) => {
  const [status, setStatus] = useState<ImageStatus>({
    loaded: false,
    error: false,
  });

  const classes = `image ${status.loaded ? "loaded" : ""} ${className || ""}`;

  const onLoad = () => setStatus((prev) => ({ ...prev, loaded: true }));

  const onError = () => setStatus((prev) => ({ ...prev, error: true }));

  return (
    <>
      {!status.error && !status.loaded && (
        <div style={{ width, height }} className="img-loading">
          <Skeleton aria-label="loading image" style={loadingStyles} />
        </div>
      )}
      <img
        {...props}
        width={width}
        height={height}
        className={classes}
        src={!status.error ? src : Fallback || NotFound}
        onLoad={onLoad}
        onError={onError}
      />
    </>
  );
};

export default memo(Image);
