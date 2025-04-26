import { createContext, FC, ReactNode, useContext, useState } from 'react';

type DrawerContextType = {
    formDrawer: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
    };
    newRecipeDrawer: {
        isOpen: boolean;
        onOpen: () => void;
        onClose: () => void;
    };
};

const DrawerContext = createContext<DrawerContextType | null>(null);

type DrawerProviderProps = {
    children: ReactNode;
};

export const DrawerProvider: FC<DrawerProviderProps> = ({ children }) => {
    // const [isOpen, setIsOpen] = useState(false);
    // const value = {
    //   isOpen,
    //   onOpen: () => setIsOpen(true),
    //   onClose: () => setIsOpen(false),
    // };

    const [formDrawer, setFormDrawer] = useState(false);
    const [newRecipeDrawer, setNewRecipeDrawer] = useState(false);
    const value = {
        formDrawer: {
            isOpen: formDrawer,
            onOpen: () => setFormDrawer(true),
            onClose: () => setFormDrawer(false),
        },
        newRecipeDrawer: {
            isOpen: newRecipeDrawer,
            onOpen: () => setNewRecipeDrawer(true),
            onClose: () => setNewRecipeDrawer(false),
        },
    };
    return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
};

export const useDrawers = (): DrawerContextType => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('no DrawerProvider');
    }
    return context;
};
