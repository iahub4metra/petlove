import { useState } from 'react';

export const useToggle = (initial = false) => {
    const [isOpen, setIsOpen] = useState(initial);
    const toggle = () => setIsOpen((prev) => !prev);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    return { isOpen, toggle, open, close };
};
