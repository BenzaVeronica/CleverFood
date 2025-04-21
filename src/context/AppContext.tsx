import { MobileMenuProvider } from './MobileMenuContext';
import { SearchProvider } from './SearchContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <MobileMenuProvider>
        <SearchProvider>{children}</SearchProvider>
    </MobileMenuProvider>
);
