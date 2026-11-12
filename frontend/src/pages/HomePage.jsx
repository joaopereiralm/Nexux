import Footer from '../components/layout/Footer.jsx';
import Header from '../components/layout/Header.jsx';
import Benefits from './home/Benefits.jsx';
import Curriculum from './home/Curriculum.jsx';
import Faq from './home/Faq.jsx';
import Hero from './home/Hero.jsx';
import Instructors from './home/Instructors.jsx';
import Pricing from './home/Pricing.jsx';
import Testimonials from './home/Testimonials.jsx';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Benefits />
        <Curriculum />
        <Instructors />
        <Testimonials />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
