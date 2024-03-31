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

  console.log("State", isVisible)

  useEffect(() => {

    const handleClickOutside1 = (event: MouseEvent | TouchEvent) => {
        const targetElement = event.target as HTMLElement; // Cast to HTMLElement to access .closest method
    
        if (buttonRef.current && !buttonRef.current.contains(targetElement) &&
            !targetElement.closest('#user-dropdown')) {
                setIsVisible();
        }
      };
    
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
        popoverRef.current && !popoverRef.current.contains(event.target as Node)
      ) {
        setIsVisible();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [buttonRef, isVisible]);

  return (
    <>
      {isVisible && (
        <div
          ref={popoverRef}
          className="absolute z-50 my-4 w-48 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
          style={{ top: '80%', right: 0 }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Popover;
