import ModalOverlayStyles from "./ModalOverlayStyles.module.css";

interface ModalOverlayProps {
  handleClickOutsideModal: () => void;
}

export const ModalOverlay = ({ handleClickOutsideModal } : ModalOverlayProps) => {
  return (
    <div
      className={ModalOverlayStyles.overlay}
      onClick={handleClickOutsideModal}
    ></div>
  );
};
