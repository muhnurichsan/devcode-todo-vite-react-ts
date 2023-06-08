import { useCallback, useEffect, useState } from "react";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import ActivityCard from "../components/ActivityCard";
import axios from "axios";
import ModalConfirm from "../components/ModalConfirm";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const GET_ALL_ACTIVITY = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://todo.api.devcode.gethired.id/activity-groups?email=mnichsaan@gmail.com"
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClickAdd = async () => {
    await axios.post("https://todo.api.devcode.gethired.id/activity-groups", {
      email: "mnichsaan@gmail.com",
      title: "Activity Baru",
    });
    GET_ALL_ACTIVITY();
  };

  useEffect(() => {
    GET_ALL_ACTIVITY();
  }, [GET_ALL_ACTIVITY]);

  return (
    <div className="mx-20 lg:mx-80 mt-10">
      <div className="flex justify-between">
        <h2 className="text-4xl font-bold">Activity</h2>
        <Button label="Tambah" onClick={handleClickAdd}></Button>
      </div>
      <ModalConfirm mutate={GET_ALL_ACTIVITY} isTodoItem={false}></ModalConfirm>
      <div className="mt-10 flex gap-5">
        {data.length === 0 ? (
          <EmptyState isActivity />
        ) : (
          data.map((item, index) => {
            return <ActivityCard key={`ac-${index}`} data={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
