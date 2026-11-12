import { Route, Routes } from 'react-router-dom';
import DesignSystemPage from '../pages/DesignSystemPage.jsx';
import HomePage from '../pages/HomePage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';
import LoginPage from '../pages/login/LoginPage.jsx';

import EnrollmentPage from '../pages/EnrollmentPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/curso" element={<HomePage />} />
      <Route path="/matricula" element={<EnrollmentPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}