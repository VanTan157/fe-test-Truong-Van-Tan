import React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import { AppProviders } from './app/AppProviders';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppProviders />
    </React.StrictMode>,
);
