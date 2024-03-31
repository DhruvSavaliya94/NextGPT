// Popover.tsx
import React, { useEffect, useRef } from 'react';


interface PopoverProps {
  buttonRef: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  isVisible: boolean;
  setIsVisible: () => void ;
}

const Popover: React.FC<PopoverProps> = ({ buttonRef, children , isVisible,  setIsVisible }) => {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
        popoverRef.current && !popoverRef.current.contains(event.target as Node)
      ) {
        setIsVisible();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [buttonRef]);

  return (
    <>
      {isVisible && (
        <div
          ref={popoverRef}
          className="absolute z-50 my-4 w-48 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
          style={{ top: '20%', right: 0 }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Popover;
