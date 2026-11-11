import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <a className="skip-link" href="#main-content">
          Pular para o conteúdo
        </a>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
