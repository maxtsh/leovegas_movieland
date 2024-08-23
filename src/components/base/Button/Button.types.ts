export type ButtonSize = "sm" | "md" | "lg";
export type ButtonVariants = "primary" | "secondary" | "danger" | "ghost";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  fullWidth?: boolean;
  variant?: ButtonVariants;
}
