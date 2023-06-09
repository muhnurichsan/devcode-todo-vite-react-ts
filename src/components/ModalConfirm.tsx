import Modal from "./Modal";
import modalDeleteIcon from "../assets/modal-delete.svg";
import modalInfoIcon from "../assets/modal-info.svg";
import Button from "./Button";
import useModalConfirm from "../hooks/useModalCofirm";
import { useCallback } from "react";
import axios from "axios";

interface ModalConfirmProps {
  isTodoItem?: boolean;
  mutate: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ isTodoItem, mutate }) => {
  const modalConfirm = useModalConfirm();

  const handleDeleteButton = useCallback(async () => {
    try {
      if (!isTodoItem) {
        await axios.delete(
          `https://todo.api.devcode.gethired.id/activity-groups/${modalConfirm.data.id}`
        );
        modalConfirm.onOpenInfo();
        mutate();
      } else {
        await axios.delete(
          `https://todo.api.devcode.gethired.id/todo-items/${modalConfirm.data.id}`
        );
        modalConfirm.onOpenInfo();
        mutate();
      }
    } catch (error) {
      console.log(error);
    }
  }, [modalConfirm, isTodoItem, mutate]);

  const body = (
    <div
      data-cy="modalConfirm-todo"
      className="py-5 px-14"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {modalConfirm.isOpenInfo ? (
        <div data-cy="modal-information" className="flex gap-3 items-center">
          <img src={modalInfoIcon} alt="modal-info-icon" />
          <p className="text-sm font-medium">Activity berhasil dihapus</p>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10">
          <img src={modalDeleteIcon} alt="modal-delete-icon" />
          <p className="text-lg font-medium text-center">
            Apakah anda yakin menghapus activity <br />
            <span className="font-bold">"{modalConfirm.data.title}"</span> ?
          </p>
          <div className="flex gap-5">
            <Button
              dataCy="modal-delete-cancel-button"
              label="Batal"
              isSecondary
              onClick={() => {
                modalConfirm.onCloseConfirm();
              }}
            ></Button>
            <Button
              label="Hapus"
              isDanger
              onClick={handleDeleteButton}
            ></Button>
          </div>
        </div>
      )}
    </div>
  );
  return (
    <Modal
      data-cy="modalConfirm-todo"
      isOpen={modalConfirm.isOpenConfirm || modalConfirm.isOpenInfo}
      body={body}
    ></Modal>
  );
};

export default ModalConfirm;
