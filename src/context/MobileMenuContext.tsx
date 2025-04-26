import { createContext, FC, ReactNode, useContext, useState } from 'react';

type MobileMenuContextType = {
    isOpen: boolean;
    toggleMenu: () => void;
    closeMenu: () => void;
    openMenu: () => void;
};

const MobileMenuContext = createContext<MobileMenuContextType | null>(null);

type MobileMenuProviderProps = {
    children: ReactNode;
};

export const MobileMenuProvider: FC<MobileMenuProviderProps> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);
    const closeMenu = () => setIsOpen(false);
    const openMenu = () => setIsOpen(true);

    const value = {
        isOpen,
        toggleMenu,
        closeMenu,
        openMenu,
    };

    return <MobileMenuContext.Provider value={value}>{children}</MobileMenuContext.Provider>;
};

export const useMobileMenu = (): MobileMenuContextType => {
    const context = useContext(MobileMenuContext);
    if (!context) {
        throw new Error('no MobileMenuProvider');
    }
    return context;
};
