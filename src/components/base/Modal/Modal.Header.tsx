type Props = {
  className?: string;
};

function ModalHeader({ children, className }: React.PropsWithChildren<Props>) {
  const classes = `modal__header ${className ?? ""}`.trim();

  return <div className={classes}>{children}</div>;
}

export default ModalHeader;
