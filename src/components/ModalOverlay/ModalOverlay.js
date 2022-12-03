import { useEffect } from "react";
import PropTypes from "prop-types";

import ModalOverlayStyles from "./ModalOverlayStyles.module.css";

export const ModalOverlay = ({ handleClickOutsideModal }) => {
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.code === "Escape") {
        handleClickOutsideModal();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleClickOutsideModal]);

  return (
    <div
      className={ModalOverlayStyles.overlay}
      onClick={handleClickOutsideModal}
    ></div>
  );
};

ModalOverlay.propTypes = {
  handleClickOutsideModal: PropTypes.func.isRequired,
};
