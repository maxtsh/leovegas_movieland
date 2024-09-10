type Props = {
  className?: string;
};

function ModalBody({ children, className }: React.PropsWithChildren<Props>) {
  const classes = `modal__body ${className ?? ""}`.trim();

  return <div className={classes}>{children}</div>;
}

export default ModalBody;
