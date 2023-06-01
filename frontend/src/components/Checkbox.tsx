const Checkbox = ({
  checked,
  onInputChange,
  className = '',
}: {
  checked: boolean;
  onInputChange: () => void;
  className?: string;
}) => {
  return (
    <input
      className={className}
      type="checkbox"
      onChange={() => onInputChange()}
      checked={checked}
    />
  );
};

export default Checkbox;
