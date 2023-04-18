import { useState } from 'react';
import './Input.scss';

const Input = ({
  onEnter,
  value = '',
  autoFocus,
}: {
  onEnter: (val: string) => void;
  value?: string;
  autoFocus?: boolean;
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e.currentTarget.value);
    }
  };

  return (
    <input
      autoFocus={!!autoFocus}
      className="input"
      onKeyDown={onKeyDown}
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
    />
  );
};

export default Input;
