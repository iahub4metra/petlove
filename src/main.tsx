import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { BrowserRouter } from 'react-router';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { ThemeProvider } from '@mui/material';
import theme from './utils/theme';
import PageProvider from './components/Context/PageProvider';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <PageProvider>
                        <App />
                    </PageProvider>
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
