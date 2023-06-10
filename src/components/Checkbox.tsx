interface CheckboxProps {
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      data-cy="todo-item-checkbox"
      checked={checked}
      onChange={onChange}
      type="checkbox"
      className="w-5 h-5 peer"
    />
  );
};

export default Checkbox;
