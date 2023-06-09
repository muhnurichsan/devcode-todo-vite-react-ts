import addIcon from "../assets/add.svg";

interface ButtonProps {
  label?: string;
  isDanger?: boolean;
  isSecondary?: boolean;
  isAdd?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  asIcon?: string;
  addOnClassname?: string;
  type?: "button" | "submit";
  dataCy?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  isDanger,
  isSecondary,
  onClick,
  isAdd,
  asIcon,
  addOnClassname,
  type,
  dataCy,
}) => {
  if (asIcon) {
    return (
      <img
        data-cy={dataCy}
        src={asIcon}
        alt="icon"
        onClick={onClick}
        className={`cursor-pointer ${addOnClassname}`}
      />
    );
  }
  return (
    <button
      data-cy={dataCy}
      onClick={onClick}
      type={type}
      className={`px-5 py-3 ${
        isDanger
          ? "bg-danger text-white"
          : isSecondary
          ? "bg-secondary text-black"
          : "bg-primary text-white"
      } rounded-full text-lg font-semibold`}
    >
      {!isDanger && !isSecondary && !isAdd && (
        <img src={addIcon} alt="add-icon" className="inline" />
      )}{" "}
      {label}
    </button>
  );
};

export default Button;
