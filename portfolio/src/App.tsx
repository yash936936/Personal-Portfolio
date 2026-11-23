import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import RouteMetadata from "./components/RouteMetadata";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";

import Home from "./pages/Home";
import Work from "./pages/Work";
import Research from "./pages/Research";
import Writing from "./pages/Writing";
import ServiceAI from "./pages/ServiceAI";
import ServiceWeb from "./pages/ServiceWeb";
import ServiceInfrastructure from "./pages/ServiceInfrastructure";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LegalNotice from "./pages/LegalNotice";

function Shell() {
  useScrollToTop();

  return (
    <>
      <RouteMetadata />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/research" element={<Research />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<Writing />} />
        <Route path="/services/ai" element={<ServiceAI />} />
        <Route path="/services/web" element={<ServiceWeb />} />
        <Route path="/services/infrastructure" element={<ServiceInfrastructure />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<LegalNotice />} />
      </Routes>
    </>
  );
}

export default function App() {
  useSmoothScroll();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <CustomCursor />
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Shell />
      </main>
      <Footer />
    </>
  );
}
