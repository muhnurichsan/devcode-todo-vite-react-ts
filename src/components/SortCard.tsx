import latestSortIcon from "../assets/latest.svg";
import oldestSortIcon from "../assets/oldest.svg";
import ascSort from "../assets/asc.svg";
import descSort from "../assets/desc.svg";
import unfinishSort from "../assets/unfinish.svg";
import checked from "../assets/checked.svg";
import { useState } from "react";

interface SortCardProps {
  isOpen: boolean;
  handleSort: (sort: number) => void;
}

const SortCard: React.FC<SortCardProps> = ({ isOpen, handleSort }) => {
  const [selectedOption, setSelectedOption] = useState(1);
  const sortOptions = [
    {
      id: 1,
      icon: latestSortIcon,
      title: "Terbaru",
      dataCy: "sort-latest",
    },
    {
      id: 2,
      icon: oldestSortIcon,
      title: "Terlama",
      dataCy: "sort-oldest",
    },
    {
      id: 3,
      icon: ascSort,
      title: "A-Z",
      dataCy: "sort-az",
    },
    {
      id: 4,
      icon: descSort,
      title: "Z-A",
      dataCy: "sort-za",
    },
    {
      id: 5,
      icon: unfinishSort,
      title: "Belum Selesai",
      dataCy: "sort-unfinished",
    },
  ];

  if (!isOpen) {
    return null;
  }

  const handleClick = (sort: number) => {
    setSelectedOption(sort);
    handleSort(sort);
  };

  return (
    <div className="w-52 bg-white rounded-lg absolute top-16">
      {sortOptions.map((item, index) => {
        return (
          <div
            data-cy={item.dataCy}
            onClick={() => {
              handleClick(item.id);
            }}
            key={item.id}
            className={`flex p-3 cursor-pointer hover:bg-slate-100 ${
              index === sortOptions.length - 1 ? "" : "border-b-[1px]"
            }`}
          >
            <div className="flex" data-cy="sort-selection">
              <img src={item.icon} alt="latest-icon" />
              <p className="ml-2 text-md">{item.title}</p>
            </div>
            {selectedOption === item.id && (
              <img src={checked} alt="checked-icon" className="ml-auto" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SortCard;
