import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { usePageMeta } from "./hooks/usePageMeta";

const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Work"));
const ServiceAI = lazy(() => import("./pages/ServiceAI"));
const ServiceWeb = lazy(() => import("./pages/ServiceWeb"));
const ServiceInfrastructure = lazy(() => import("./pages/ServiceInfrastructure"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicesIndex = lazy(() => import("./pages/ServicesIndex"));

function Shell() {
  useScrollToTop();
  usePageMeta();

  return (
    <Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/services" element={<ServicesIndex />} />
        <Route path="/services/ai" element={<ServiceAI />} />
        <Route path="/services/web" element={<ServiceWeb />} />
        <Route path="/services/infrastructure" element={<ServiceInfrastructure />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mentions-legales" element={<LegalNotice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
