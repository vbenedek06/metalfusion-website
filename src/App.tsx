import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Rolunk from './pages/Rolunk';
import Szolgaltatasok from './pages/Szolgaltatasok';
import Referenciak from './pages/Referenciak';
import Geppark from './pages/Geppark';
import Kapcsolat from './pages/Kapcsolat';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rolunk" element={<Rolunk />} />
          <Route path="/szolgaltatasok" element={<Szolgaltatasok />} />
          <Route path="/referenciak" element={<Referenciak />} />
          <Route path="/geppark" element={<Geppark />} />
          <Route path="/kapcsolat" element={<Kapcsolat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
