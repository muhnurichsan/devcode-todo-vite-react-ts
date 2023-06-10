import closeIcon from "../assets/close.svg";
import useModalForm from "../hooks/useModalForm";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import InputSelect from "./InputSelect";

interface ModalFormProps {
  mutate: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ mutate }) => {
  const modalForm = useModalForm();
  const { data } = modalForm;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);

  const ADD_NEW_ACTIVITY = useCallback(async () => {
    try {
      await axios.post("https://todo.api.devcode.gethired.id/todo-items", {
        activity_group_id: id,
        priority: priority,
        title,
      });
      modalForm.onClose();
      mutate();
    } catch (error) {
      console.log(error);
    }
  }, [id, priority, title, modalForm, mutate]);

  const EDIT_ACTIVITY = useCallback(async () => {
    try {
      await axios.patch(
        `https://todo.api.devcode.gethired.id/todo-items/${data?.id}`,
        {
          priority: priority,
          title: title,
        }
      );
      mutate();
      modalForm.onClose();
    } catch (error) {
      console.log(error);
    }
  }, [modalForm, data, title, priority, mutate]);

  const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleValuePriority = (data: Record<string, any>) => {
    setPriority(data.value);
  };

  const body = (
    <div
      data-cy="modal-add"
      className="w-[450px] lg:w-[830px] relative"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Header */}
      <div className="flex justify-between p-5 items-center">
        <h2 className="text-lg font-semibold">
          {data ? "Edit Item" : "Tambah List Item"}
        </h2>
        <Button
          asIcon={closeIcon}
          addOnClassname="cursor-pointer"
          onClick={() => {
            modalForm.onClose();
          }}
        />
      </div>
      {/* Content */}
      <div className="border-y-[1px] ">
        <div className="px-5 py-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="title-activity"
              className="text-xs uppercase font-semibold"
            >
              Nama list item
            </label>
            <Input
              dataCy="modal-add-name-input"
              value={title || ""}
              id="title-activity"
              placeholder="Tambahkan nama activity"
              onChange={handleChangeInputTitle}
            ></Input>
          </div>
          <div
            className="flex flex-col gap-2 relative w-1/2"
            onClick={(e) => {
              e.stopPropagation();
              setOpenDropdown(!openDropdown);
            }}
          >
            <label
              htmlFor="priority-activity"
              className="text-xs uppercase font-semibold"
            >
              Priority
            </label>
            {/* Custom Select */}
            <InputSelect
              value={priority || ""}
              openDropdown={openDropdown}
              handleValuePriority={handleValuePriority}
            ></InputSelect>
            {/* Custom Select */}
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="py-2 flex justify-end pr-5">
        <Button
          label="Simpan"
          dataCy={!data ? "modal-add-save-button" : ""}
          isAdd
          onClick={data ? EDIT_ACTIVITY : ADD_NEW_ACTIVITY}
        ></Button>
      </div>
    </div>
  );

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setPriority(data?.priority);
    }
  }, [data]);
  return <Modal isOpen={modalForm.isOpen} body={body}></Modal>;
};

export default ModalForm;
