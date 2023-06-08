import latestSortIcon from "../assets/latest.svg";
import oldestSortIcon from "../assets/oldest.svg";
import ascSort from "../assets/asc.svg";
import descSort from "../assets/desc.svg";
import unfinishSort from "../assets/unfinish.svg";
import checked from "../assets/checked.svg";

interface SortCardProps {
  isOpen: boolean;
}

const SortCard: React.FC<SortCardProps> = ({ isOpen }) => {
  const sortOptions = [
    {
      icon: latestSortIcon,
      title: "Terbaru",
      selected: true,
    },
    {
      icon: oldestSortIcon,
      title: "Terlama",
      selected: false,
    },
    {
      icon: ascSort,
      title: "A-Z",
      selected: false,
    },
    {
      icon: descSort,
      title: "Z-A",
      selected: false,
    },
    {
      icon: unfinishSort,
      title: "Belum Selesai",
      selected: false,
    },
  ];
  if (!isOpen) {
    return null;
  }
  return (
    <div
      data-cy="sortCard-todo"
      className="w-52 bg-white rounded-lg absolute top-16"
    >
      {sortOptions.map((item, index) => {
        return (
          <div
            key={`sort-${index}`}
            className={`flex p-3 cursor-pointer hover:bg-slate-100 ${
              index === sortOptions.length - 1 ? "" : "border-b-[1px]"
            }`}
          >
            <img src={item.icon} alt="latest-icon" />
            <p className="ml-2 text-md">{item.title}</p>
            {item.selected && (
              <img src={checked} alt="checked-icon" className="ml-auto" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SortCard;
