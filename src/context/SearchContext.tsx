import { createContext, useContext, useState } from 'react';

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isSearchActive: boolean;
    setIsSearchActive: (active: boolean) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);

    return (
        <SearchContext.Provider
            value={{ searchQuery, setSearchQuery, isSearchActive, setIsSearchActive }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('no SearchProvider');
    }
    return context;
};
