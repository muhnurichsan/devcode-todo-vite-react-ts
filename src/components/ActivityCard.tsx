import { useNavigate } from "react-router-dom";
import deleteIcon from "../assets/delete.svg";
import Button from "./Button";
import useModalConfirm from "../hooks/useModalCofirm";

interface ActivityCardProps {
  data: Record<string, any>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ data }) => {
  const modalConfirm = useModalConfirm();
  const navigate = useNavigate();
  const date = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(new Date(data.created_at));

  return (
    <div className="w-60 h-60 flex flex-col rounded-lg px-6 py-5 justify-between shadow-md bg-white">
      <h2
        className="text-lg font-bold cursor-pointer"
        onClick={() => {
          navigate(`/detail/${data.id}`);
        }}
      >
        {data.title}
      </h2>

      <div className="flex justify-between">
        <p className="text-sm text-[#888888] font-medium">{date}</p>
        <Button
          asIcon={deleteIcon}
          addOnClassname="w-5 h-5"
          onClick={() => {
            modalConfirm.onOpenConfirm(data);
          }}
        ></Button>
      </div>
    </div>
  );
};

export default ActivityCard;
