import Footer from '../../components/layout/Footer.jsx';
import Header from '../../components/layout/Header.jsx';
import LoginForm from '../../components/auth/LoginForm.jsx';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}
