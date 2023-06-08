interface InputProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  value?: string;
  onKeyPress?: () => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  onChange,
  id,
  onClick,
  className,
  value,
  onKeyPress,
}) => {
  return (
    <input
      id={id}
      onKeyUp={onKeyPress}
      onClick={onClick}
      required
      value={value}
      data-cy="input-todo"
      onChange={onChange}
      type="text"
      className={
        className
          ? className
          : "py-3 px-4 block border w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500"
      }
      placeholder={placeholder}
    />
  );
};

export default Input;
