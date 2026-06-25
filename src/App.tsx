import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useAnalyticsPageView } from './hooks/useAnalyticsPageView';
import { initAnalytics } from './lib/analytics';
import Home from './pages/Home';
import Rolunk from './pages/Rolunk';
import Szolgaltatasok from './pages/Szolgaltatasok';
import ServiceDetail from './pages/ServiceDetail';
import Referenciak from './pages/Referenciak';
import Geppark from './pages/Geppark';
import Kapcsolat from './pages/Kapcsolat';
import Impresszum from './pages/Impresszum';
import Adatvedelem from './pages/Adatvedelem';
import NotFound from './pages/NotFound';

export default function App() {
  useScrollReveal();
  useAnalyticsPageView();

  useEffect(() => initAnalytics(), []);

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rolunk" element={<Rolunk />} />
          <Route path="/szolgaltatasok" element={<Szolgaltatasok />} />
          <Route path="/szolgaltatasok/:slug" element={<ServiceDetail />} />
          <Route path="/referenciak" element={<Referenciak />} />
          <Route path="/geppark" element={<Geppark />} />
          <Route path="/kapcsolat" element={<Kapcsolat />} />
          <Route path="/impresszum" element={<Impresszum />} />
          <Route path="/adatvedelem" element={<Adatvedelem />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
