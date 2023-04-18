import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';
import { NotesContextProvider, NotesProvider } from './store/notes-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <NotesContextProvider>
<AuthContextProvider> 
    <App /> 
</AuthContextProvider>
</NotesContextProvider>
);
