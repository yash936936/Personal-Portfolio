import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";

import Home from "./pages/Home";
import Work from "./pages/Work";
import ServiceAI from "./pages/ServiceAI";
import ServiceWeb from "./pages/ServiceWeb";
import ServiceInfrastructure from "./pages/ServiceInfrastructure";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LegalNotice from "./pages/LegalNotice";

function Shell() {
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/services/ai" element={<ServiceAI />} />
      <Route path="/services/web" element={<ServiceWeb />} />
      <Route path="/services/infrastructure" element={<ServiceInfrastructure />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mentions-legales" element={<LegalNotice />} />
    </Routes>
  );
}

export default function App() {
  useSmoothScroll();
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <Shell />
      </main>
      <Footer />
    </>
  );
}