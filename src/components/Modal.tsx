import useModalAdd from "../hooks/useModalAdd";
import useModalConfirm from "../hooks/useModalCofirm";

interface ModalProps {
  isOpen: boolean;
  body?: React.ReactElement;
}

const Modal: React.FC<ModalProps> = ({ isOpen, body }) => {
  const modalConfirm = useModalConfirm();
  const modalAdd = useModalAdd();
  if (!isOpen) {
    return null;
  }
  return (
    <div
      onClick={() => {
        modalAdd.onClose();
        modalConfirm.onCloseConfirm();
        modalConfirm.onCloseInfo();
      }}
      className="
    justify-center items-center
    flex overflow-x-hidden overflow-y-auto
    fixed
    inset-0
    z-50
    text-white
    focus:outline-none
    bg-neutral-800
    bg-opacity-70
    transition duration-200
    "
    >
      <div className="bg-white w-fit text-black rounded-md">{body}</div>
    </div>
  );
};

export default Modal;
