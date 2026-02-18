
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import '@mescius/wijmo.styles/wijmo.css';
import '@/frontend.css'; 
import { getStoredLocale } from '@/i18n/localeStorage';
import { loadWijmoCulture } from '@/bootstrap/loadWijimoCulture';


const queryClient = new QueryClient();

async function enableMocking() {
  if (import.meta.env.DEV) {
    // The mocks were copied to src/mocks inside shell-kit
    const { worker } = await import('./mocks/browser');
    return worker.start({
        onUnhandledRequest: 'bypass',
    });
  }
}

const bootstrap = async () => {
    const locale = getStoredLocale() ?? 'kr';

    await loadWijmoCulture(locale);
    await enableMocking();

    ReactDOM.createRoot(document.getElementById('root')!).render(
      <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
      </React.StrictMode>,
    );
}

bootstrap();
