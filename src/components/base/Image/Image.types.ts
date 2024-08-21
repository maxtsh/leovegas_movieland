export type ImageStatus = { loaded: boolean; error: boolean };

export interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  Fallback?: string;
  loadingStyles?: React.CSSProperties;
}
