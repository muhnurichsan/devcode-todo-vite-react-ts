import closeIcon from "../assets/close.svg";
import useModalAdd from "../hooks/useModalAdd";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { useCallback, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface ModalAddProps {
  mutate: () => void;
}

const ModalAdd: React.FC<ModalAddProps> = ({ mutate }) => {
  const modalAdd = useModalAdd();
  const { data } = modalAdd;
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");

  const ADD_NEW_ACTIVITY = useCallback(async () => {
    try {
      await axios.post("https://todo.api.devcode.gethired.id/todo-items", {
        activity_group_id: id,
        priority: priority,
        title,
      });
      modalAdd.onClose();
      mutate();
    } catch (error) {
      console.log(error);
    }
  }, [id, priority, title, modalAdd, mutate]);

  const EDIT_ACTIVITY = useCallback(async () => {
    try {
      await axios.patch(
        `https://todo.api.devcode.gethired.id/todo-items/${modalAdd?.data?.id}`,
        {
          priority: priority,
          title: title,
        }
      );
      mutate();
      modalAdd.onClose();
    } catch (error) {
      console.log(error);
    }
  }, [modalAdd, title, priority, mutate]);

  const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const body = (
    <div
      className="w-[450px] lg:w-[830px]"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* Header */}
      <div className="flex justify-between p-5 items-center">
        <h2 className="text-lg font-semibold">
          {data ? "Edit Item" : "Tambah List Item"}
        </h2>
        <img
          src={closeIcon}
          alt="close-icon"
          className="cursor-pointer"
          onClick={() => {
            modalAdd.onClose();
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
              value={title || ""}
              id="title-activity"
              placeholder="Tambahkan nama activity"
              onChange={handleChangeInputTitle}
            ></Input>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="priority-activity"
              className="text-xs uppercase font-semibold"
            >
              Priority
            </label>
            <select
              onClick={(e: any) => {
                setPriority(e.target.value);
              }}
              defaultValue={data?.priority}
              className="py-3 px-4 pr-9 block w-1/2 lg:w-1/4 border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
            >
              <option value="very-high">Very High</option>
              <option value="high">High</option>
              <option value="normal">Medium</option>
              <option value="low">Low</option>
              <option value="very-low">Very Low</option>
            </select>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="py-2 flex justify-end pr-5">
        <Button
          label="Simpan"
          isAdd
          onClick={data ? EDIT_ACTIVITY : ADD_NEW_ACTIVITY}
        ></Button>
      </div>
    </div>
  );

  useEffect(() => {
    if (data) {
      setTitle(data.title);
    }
  }, [data]);
  return <Modal isOpen={modalAdd.isOpen} body={body}></Modal>;
};

export default ModalAdd;
