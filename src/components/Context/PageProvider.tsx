import { type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { PageContext } from './PageContext';

export interface PageContextProps {
    children: ReactNode;
}

export default function PageProvider({ children }: PageContextProps) {
    const location = useLocation().pathname;
    const isHome = location === '/';
    return (
        <PageContext.Provider value={{ isHome }}>
            {children}
        </PageContext.Provider>
    );
}
