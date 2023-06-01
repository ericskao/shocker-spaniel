import { useEffect, useRef, useState } from 'react';

const OutsideClickDetector = ({
  children,
  onClickOutside,
  className = '',
}: {
  children: any;
  onClickOutside: () => void;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsClickedOutside(true);
        onClickOutside();
      }
    };

    const handleMouseDown = () => {
      setIsClickedOutside(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className={className} ref={ref}>
      {children}
    </div>
  );
};

export default OutsideClickDetector;
