import { Route, Routes } from 'react-router-dom';
import DesignSystemPage from '../pages/DesignSystemPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import LoginPage from '../pages/login/LoginPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}