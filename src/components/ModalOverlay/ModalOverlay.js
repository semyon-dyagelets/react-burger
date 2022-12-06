import PropTypes from "prop-types";

import ModalOverlayStyles from "./ModalOverlayStyles.module.css";

export const ModalOverlay = ({ handleClickOutsideModal }) => {
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
