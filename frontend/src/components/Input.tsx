import './Input.scss';

const Input = ({ onEnter }: { onEnter: (val: string) => void }) => {
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e.currentTarget.value);
    }
  };
  return <input className="input" onKeyDown={onKeyDown} />;
};

export default Input;
