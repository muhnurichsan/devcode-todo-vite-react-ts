import { useEffect, useMemo, useState } from "react";
import checkedIcon from "../assets/checked.svg";
import arrowDownIcon from "../assets/arrow-down.svg";
import Button from "./Button";

interface InputSelectProps {
  openDropdown: boolean;
  value?: string;
  handleValuePriority: (value: Record<string, any>) => void;
}

type SelectedType = {
  title: string;
  color: string;
  value: string;
};

const InputSelect: React.FC<InputSelectProps> = ({
  openDropdown,
  handleValuePriority,
  value,
}) => {
  const priorities = useMemo(
    () => [
      {
        title: "Very High",
        color: "bg-red-500",
        value: "very-high",
      },
      {
        title: "High",
        color: "bg-yellow-500",
        value: "high",
      },
      {
        title: "Medium",
        color: "bg-green-500",
        value: "normal",
      },
      {
        title: "Low",
        color: "bg-blue-500",
        value: "low",
      },
      {
        title: "Very Low",
        color: "bg-purple-500",
        value: "very-low",
      },
    ],
    []
  );

  const [selected, setSelected] = useState<SelectedType>({
    title: "",
    color: "",
    value: "",
  });

  useEffect(() => {
    if (value !== "") {
      const findPr = priorities.find((element) => {
        return element.value === value;
      }) as SelectedType;
      setSelected(findPr);
    }
  }, [value, priorities]);

  return (
    <div>
      <div
        data-cy="modal-add-priority-dropdown"
        className={`w-52 bg-white ${
          openDropdown ? "rounded-t-lg" : "rounded-lg"
        } top-16 border`}
      >
        <div className={`flex items-center pr-2 py-4 cursor-pointer`}>
          {selected?.color && (
            <div
              className={`ml-3 rounded-full w-3 h-3 ${selected.color}`}
            ></div>
          )}
          <p className="ml-4 text-md">
            {selected?.title ? selected.title : "Pilih priority"}
          </p>
          <img
            src={arrowDownIcon}
            alt="arrowDown-icon"
            className={`ml-auto ${
              openDropdown ? "rotate-0" : "rotate-180"
            } transition`}
          />
        </div>
      </div>
      {openDropdown && (
        <div className="absolute">
          {priorities.map((item, index) => {
            return (
              <div
                key={`priority-${index}`}
                className={`w-52 bg-white top-20 border ${
                  index === priorities.length - 1 ? "rounded-b-lg" : ""
                } cursor-pointer`}
                onClick={() => {
                  handleValuePriority(item);
                  setSelected(item);
                }}
              >
                <div className="flex items-center pr-3 py-4 hover:bg-slate-100  ">
                  <div
                    className={`ml-3 rounded-full w-3 h-3 ${item.color}`}
                  ></div>
                  <p className="ml-4 text-md">{item.title}</p>
                  {selected.title === item.title && (
                    <Button
                      asIcon={checkedIcon}
                      addOnClassname="ml-auto transition"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InputSelect;
