import usePortal from "@/hooks/usePortal";
import ModalBody from "./Modal.Body";
import ModalHeader from "./Modal.Header";
import ModalFooter from "./Modal.Footer";
import "./Modal.styles.scss";
import Button from "../Button";
import { FaX } from "react-icons/fa6";

type Props = {
  show: boolean;
  onClose: () => void;
  classNames?: {
    wrapper?: string;
    overlay?: string;
    content?: string;
  };
};

function Modal({
  show,
  children,
  classNames,
  onClose,
}: React.PropsWithChildren<Props>) {
  const { renderPortal } = usePortal();
  const wrapperClasses = `modal ${classNames?.wrapper ?? ""}`.trim();
  const overlayClasses = `modal__overlay ${classNames?.overlay ?? ""}`.trim();
  const contentClasses = `modal__content ${classNames?.content ?? ""}`.trim();

  if (!show) return null;

  return renderPortal(
    <div role="dialog" aria-modal="true" className={wrapperClasses}>
      <div className={overlayClasses} role="presentation"></div>
      <div className={contentClasses}>
        <Button
          size="md"
          variant="secondary"
          aria-label="modal close button"
          className="modal__close-btn"
          onClick={onClose}>
          <FaX size={15} />
        </Button>
        {children}
      </div>
    </div>,
  );
}

Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;

export default Modal;
