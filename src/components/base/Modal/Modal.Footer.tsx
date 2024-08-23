type Props = {
  className?: string;
};

function ModalFooter({ children, className }: React.PropsWithChildren<Props>) {
  const classes = `modal__footer ${className ?? ""}`.trim();

  return <div className={classes}>{children}</div>;
}

export default ModalFooter;
