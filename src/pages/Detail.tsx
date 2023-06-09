import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import backIcon from "../assets/back.svg";
import editIcon from "../assets/edit.svg";
import sortIcon from "../assets/sort.svg";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useCallback, useEffect } from "react";
import ActivityItem from "../components/ActivityItem";
import useModalForm from "../hooks/useModalForm";
import SortCard from "../components/SortCard";
import axios from "axios";
import ModalForm from "../components/ModalForm";
import ModalConfirm from "../components/ModalConfirm";
import Input from "../components/Input";
import Loading from "../components/Loading";

type TodoItem = {
  id: number;
  title: string;
  is_active: number;
};

const Detail = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 0,
      title: "",
      is_active: 0,
    },
  ]);
  const modalForm = useModalForm();
  const [openSortCard, setOpenSortCard] = useState(false);
  const [sortedData, setSortedData] = useState<TodoItem[]>([]);
  const [titleClicked, setTitleClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleActivity, setTitleActivity] = useState("");
  const { id } = useParams();

  const GET_ACTIVITY_DETAIL = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://todo.api.devcode.gethired.id/activity-groups/${id}`
      );
      setTitleActivity(response.data.title);
      setData(response.data.todo_items);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

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
  const handleSort = useCallback(
    (sort: string) => {
      const result = [...data];
      let sortData: TodoItem[] = [];
      if (sort === "Terbaru") {
        sortData = result.sort((a, b) => {
          return b.id - a.id;
        });
      }
      if (sort === "Terlama") {
        sortData = result.sort((a, b) => {
          return a.id - b.id;
        });
      }
      if (sort === "A-Z") {
        sortData = result.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      }
      if (sort === "Z-A") {
        sortData = result.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      }
      if (sort === "Belum Selesai") {
        sortData = result.sort((a, b) => {
          return b.is_active - a.is_active;
        });
      }
      setSortedData(sortData);
    },
    [data]
  );

  const renderData = sortedData.length !== 0 ? sortedData : data;

  useEffect(() => {
    setLoading(true);
    GET_ACTIVITY_DETAIL();
  }, [GET_ACTIVITY_DETAIL]);

  if (loading || !data) {
    return <Loading></Loading>;
  }

  return (
    <div
      data-cy="detailPage-todo"
      className="mx-20 lg:mx-80 mt-10"
      onClick={handleChangeInputToTitle}
    >
      <ModalForm mutate={GET_ACTIVITY_DETAIL}></ModalForm>
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
              {titleActivity}
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
              modalForm.onOpen();
            }}
          ></Button>
          <SortCard handleSort={handleSort} isOpen={openSortCard}></SortCard>
        </div>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        {renderData.length === 0 ? (
          <EmptyState isActivity />
        ) : (
          renderData.map((item, index) => {
            return <ActivityItem key={`ac-${index}`} data={item} />;
          })
        )}
      </div>
    </div>
  );
};

export default Detail;
