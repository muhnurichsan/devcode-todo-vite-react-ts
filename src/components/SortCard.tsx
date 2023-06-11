import latestSortIcon from "../assets/latest.svg";
import oldestSortIcon from "../assets/oldest.svg";
import ascSort from "../assets/asc.svg";
import descSort from "../assets/desc.svg";
import unfinishSort from "../assets/unfinish.svg";
import checked from "../assets/checked.svg";
import { useState } from "react";

interface SortCardProps {
  isOpen: boolean;
  handleSort: (sort: string) => void;
}

const SortCard: React.FC<SortCardProps> = ({ isOpen, handleSort }) => {
  const [selectedOption, setSelectedOption] = useState("Terbaru");
  const sortOptions = [
    {
      icon: latestSortIcon,
      title: "Terbaru",
      dataCy: "sort-latest",
    },
    {
      icon: oldestSortIcon,
      title: "Terlama",
      dataCy: "sort-oldest",
    },
    {
      icon: ascSort,
      title: "A-Z",
      dataCy: "sort-az",
    },
    {
      icon: descSort,
      title: "Z-A",
      dataCy: "sort-za",
    },
    {
      icon: unfinishSort,
      title: "Belum Selesai",
      dataCy: "sort-unfinished",
    },
  ];

  if (!isOpen) {
    return null;
  }

  const handleClick = (sort: string) => {
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
              handleClick(item.title);
            }}
            key={`sort-${index}`}
            className={`flex p-3 cursor-pointer hover:bg-slate-100 ${
              index === sortOptions.length - 1 ? "" : "border-b-[1px]"
            }`}
          >
            <div className="flex" data-cy="sort-selection">
              <img src={item.icon} alt="latest-icon" />
              <p className="ml-2 text-md">{item.title}</p>
            </div>
            {selectedOption === item.title && (
              <img src={checked} alt="checked-icon" className="ml-auto" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SortCard;
