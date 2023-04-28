const Checkbox = ({ checked, onInputChange }: { checked: boolean; onInputChange: () => void }) => {
  return <input type="checkbox" onChange={() => onInputChange()} checked={checked} />;
};

export default Checkbox;
