import { ReactNode, useEffect } from "react";
import ReactDom from "react-dom";

import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalStyles from "./ModalStyles.module.css";

const modalRootElement = document.getElementById(
  "modal-placeholder"
) as HTMLElement;

interface ModalProps {
  buttonCloseClassName?: string;
  children?: ReactNode;
  className: string;
  onClose: () => void;
}

export const Modal = ({
  buttonCloseClassName,
  children,
  className,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [onClose]);

  return ReactDom.createPortal(
    <>
      <ModalOverlay handleClickOutsideModal={onClose} />
      <div className={ModalStyles.modal_body}>
        <button
          type="button"
          className={`${ModalStyles.modal__close} ${buttonCloseClassName}`}
          onClick={onClose}
        >
          <CloseIcon type="primary" />
        </button>
        <div className={className}>{children}</div>
      </div>
    </>,
    modalRootElement
  );
};
