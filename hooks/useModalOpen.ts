import { useState } from 'react';

export default function useModalOpen(
  initial = false,
): [boolean, (init?: boolean) => void] {
  const [isOpen, setIsOpen] = useState<boolean>(initial);

  const modalHandler = (init?: boolean) => {
    if (typeof init === 'undefined') setIsOpen(prev => !prev);
    else setIsOpen(init);
  };

  return [isOpen, modalHandler];
}
