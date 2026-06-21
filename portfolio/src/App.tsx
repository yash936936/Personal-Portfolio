import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";

import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import ServiceBranding from "./pages/ServiceBranding";
import ServiceWeb from "./pages/ServiceWeb";
import ServiceCampaigns from "./pages/ServiceCampaigns";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import LegalNotice from "./pages/LegalNotice";

function Shell() {
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<ProjectDetail />} />
      <Route path="/services/branding" element={<ServiceBranding />} />
      <Route path="/services/web" element={<ServiceWeb />} />
      <Route path="/services/campaigns" element={<ServiceCampaigns />} />
      <Route path="/blog" element={<Blog />} />
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
