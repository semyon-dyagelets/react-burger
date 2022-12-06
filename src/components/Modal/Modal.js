import React, { useEffect } from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types";

import { ModalOverlay } from "../ModalOverlay/ModalOverlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import ModalStyles from "./ModalStyles.module.css";

const modalRootElement = document.getElementById("modal-placeholder");

export const Modal = ({
  buttonCloseClassName,
  children,
  className,
  onClose,
}) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
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

Modal.propTypes = {
  buttonCloseClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
