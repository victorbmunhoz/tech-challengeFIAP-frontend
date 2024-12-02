import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa a nova API do ReactDOM
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';

// Cria a raiz do React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o aplicativo
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
