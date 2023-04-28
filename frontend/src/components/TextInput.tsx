import classNames from 'classnames';
import { useState } from 'react';

import './TextInput.scss';

const TextInput = ({
  onEnter,
  onEscape,
  value = '',
  autoFocus = false,
  placeholder = '',
  variant = 'primary',
}: {
  onEnter: (val: string) => void;
  onEscape?: () => void;
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  variant: 'primary' | 'secondary';
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e.currentTarget.value);
      setInputValue('');
    } else if (e.key === 'Escape' && onEscape) {
      onEscape();
    }
  };

  return (
    <input
      placeholder={placeholder}
      autoFocus={!!autoFocus}
      className={classNames('input', {
        input__primary: variant === 'primary',
        input__secondary: variant === 'secondary',
      })}
      onKeyDown={onKeyDown}
      value={inputValue}
      onChange={(e) => setInputValue(e.currentTarget.value)}
    />
  );
};

export default TextInput;
