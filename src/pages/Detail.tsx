import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import backIcon from "../assets/back.svg";
import editIcon from "../assets/edit.svg";
import sortIcon from "../assets/sort.svg";

import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import ActivityItem from "../components/ActivityItem";
import useModalAdd from "../hooks/useModalAdd";
import SortCard from "../components/SortCard";
import axios from "axios";
import ModalAdd from "../components/ModalAdd";
import ModalConfirm from "../components/ModalConfirm";
import Input from "../components/Input";

const Detail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: "",
    title: "",
    created_at: "",
    todo_items: [],
  });
  const modalAdd = useModalAdd();
  const [openSortCard, setOpenSortCard] = useState(false);
  const [titleClicked, setTitleClicked] = useState(false);
  const [titleActivity, setTitleActivity] = useState("");

  const { id } = useParams();

  const GET_ACTIVITY_DETAIL = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://todo.api.devcode.gethired.id/activity-groups/${id}`
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  const handleClickTitle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitleClicked(true);
  };

  const handleChangeInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitleActivity(e.target.value);
  };

  const handleInputTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleOpenSortCard = () => {
    setOpenSortCard(!openSortCard);
  };

  const handleChangeInputToTitle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitleClicked(false);
    GET_ACTIVITY_DETAIL();
  };

  const UPDATE_TITLE_ACTIVITY = useCallback(async () => {
    try {
      await axios.patch(
        `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
        {
          title: titleActivity,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [id, titleActivity]);

  useEffect(() => {
    GET_ACTIVITY_DETAIL();
    setTitleActivity(data.title);
  }, [GET_ACTIVITY_DETAIL, data.title]);
  return (
    <div className="mx-20 lg:mx-80 mt-10" onClick={handleChangeInputToTitle}>
      <ModalAdd mutate={GET_ACTIVITY_DETAIL}></ModalAdd>
      <ModalConfirm mutate={GET_ACTIVITY_DETAIL} isTodoItem></ModalConfirm>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <img
            src={backIcon}
            alt="back-icon"
            className="w-7 h-7 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
          {titleClicked ? (
            <Input
              onClick={handleInputTitleClick}
              value={titleActivity}
              onChange={handleChangeInputTitle}
              onKeyPress={UPDATE_TITLE_ACTIVITY}
              id="title-edit"
              className="bg-transparent outline-none border-b-2 text-4xl font-bold w-80"
            />
          ) : (
            <h2 onClick={handleClickTitle} className="text-4xl font-bold">
              {data.title}
            </h2>
          )}
          <Button
            asIcon={editIcon}
            addOnClassname="w-7 h-7"
            onClick={handleClickTitle}
          ></Button>
        </div>
        <div className="flex gap-5 relative">
          <Button asIcon={sortIcon} onClick={handleOpenSortCard}></Button>
          <Button
            label="Tambah"
            onClick={() => {
              modalAdd.onOpen();
            }}
          ></Button>
          <SortCard isOpen={openSortCard}></SortCard>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        {data.todo_items.length === 0 ? (
          <EmptyState isActivity />
        ) : (
          data.todo_items.map((item, index) => {
            return <ActivityItem key={`ac-${index}`} data={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Detail;
