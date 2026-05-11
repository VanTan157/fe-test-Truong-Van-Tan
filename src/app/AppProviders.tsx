import { Provider } from 'react-redux';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { router } from './router';
import { store } from '../store/store';
import { useTheme } from './theme/use-theme';
import { ThemeProvider } from './theme/ThemeProvider';

function InnerProviders() {
    const { mode } = useTheme();

    return (
        <ConfigProvider
            theme={{
                algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            }}
        >
            <Toaster position="top-right" richColors closeButton={false} theme={mode} />

            <RouterProvider router={router} />
        </ConfigProvider>
    );
}

export function AppProviders() {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <InnerProviders />
            </ThemeProvider>
        </Provider>
    );
}
