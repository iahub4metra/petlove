import { createContext } from 'react';

export const PageContext = createContext<{ isHome: boolean }>({
    isHome: false,
});
