import classNames from 'classnames';
import { MutableRefObject, useState } from 'react';

import './Input.scss';

const Input = ({
  onEnter,
  value = '',
  autoFocus = false,
  placeholder = '',
  variant = 'primary',
  ref,
}: {
  onEnter: (val: string) => void;
  value?: string;
  autoFocus?: boolean;
  placeholder?: string;
  variant: 'primary' | 'secondary';
  ref?: MutableRefObject<null>;
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter(e.currentTarget.value);
      setInputValue('');
    }
  };

  return (
    <input
      ref={ref}
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

export default Input;
