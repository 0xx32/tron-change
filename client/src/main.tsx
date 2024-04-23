import ReactDOM from 'react-dom/client';

import { AppProvider } from './components/Providers/AppProvider.tsx';
import { App } from './App';
import 'assets/styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AppProvider>
        <App />
    </AppProvider>,
);
