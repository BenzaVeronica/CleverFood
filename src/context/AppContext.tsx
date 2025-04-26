import { DrawerProvider } from './DrawerContext';
import { MobileMenuProvider } from './MobileMenuContext';
import { SearchProvider } from './SearchContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <DrawerProvider>
        <MobileMenuProvider>
            <SearchProvider>{children}</SearchProvider>
        </MobileMenuProvider>
    </DrawerProvider>
);
