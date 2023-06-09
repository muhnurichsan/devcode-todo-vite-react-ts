import editIcon from "../assets/edit.svg";
import deleteIcon from "../assets/delete.svg";
import useModalConfirm from "../hooks/useModalCofirm";
import Button from "./Button";
import { useCallback } from "react";
import axios from "axios";
import Checkbox from "./Checkbox";
import useModalForm from "../hooks/useModalForm";
interface ActivityItemProps {
  data: Record<string, any>;
  mutate: () => void;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ data, mutate }) => {
  const modalConfirm = useModalConfirm();
  const modalForm = useModalForm();

  const UPDATE_FINISH_ACTIVITY = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        await axios.patch(
          `https://todo.api.devcode.gethired.id/todo-items/${data.id}`,
          {
            is_active: e.target.checked === true ? 0 : 1,
            priority: data.priority,
          }
        );
        mutate();
      } catch (error) {
        console.log(error);
      }
    },
    [data, mutate]
  );

  const handleClickEdit = () => {
    modalForm.onOpen(data);
  };

  return (
    <div
      data-cy="activityItem-todo"
      className="min-h-[5rem] w-full flex justify-between items-center px-7 bg-white border shadow-md rounded-xl"
    >
      <div className="flex items-center gap-4">
        <Checkbox
          checked={!data.is_active}
          onChange={UPDATE_FINISH_ACTIVITY}
        ></Checkbox>
        <div
          className={`rounded-full w-2 h-2 
          ${
            data.priority === "very-high"
              ? "bg-red-500"
              : data.priority === "normal"
              ? "bg-green-500"
              : data.priority === "high"
              ? "bg-yellow-500"
              : data.priority === "very-low"
              ? "bg-purple-500"
              : data.priority === "low" && "bg-blue-500"
          }
          `}
        ></div>
        <h2 className="text-lg font-medium peer-checked:line-through peer-checked:text-gray-500">
          {data.title}
        </h2>
        <Button
          asIcon={editIcon}
          addOnClassname="w-5 h-5"
          onClick={handleClickEdit}
        ></Button>
      </div>
      <Button
        asIcon={deleteIcon}
        onClick={() => {
          modalConfirm.onOpenConfirm(data);
        }}
        addOnClassname="w-5 h-5"
      ></Button>
    </div>
  );
};

export default ActivityItem;
