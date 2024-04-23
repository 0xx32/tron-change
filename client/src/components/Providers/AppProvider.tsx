import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'components/theme-provider';
import { Toaster } from 'sonner';

const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
            <Toaster theme="dark" position="top-right" richColors duration={7000} />
        </ThemeProvider>
    );
};
