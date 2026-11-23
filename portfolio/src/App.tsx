import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import RouteMetadata from "./components/RouteMetadata";
import SiteAnalytics from "./components/SiteAnalytics";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import ServiceAI from "./pages/ServiceAI";
import ServiceWeb from "./pages/ServiceWeb";
import ServiceInfrastructure from "./pages/ServiceInfrastructure";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LegalNotice from "./pages/LegalNotice";

function LegacyWritingRedirect() {
  const { slug } = useParams();
  return <Navigate to={slug ? "/blog/" + slug : "/blog"} replace />;
}
function Shell() {
  useScrollToTop();
  return <>
    <RouteMetadata />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:slug" element={<ProjectDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<Blog />} />
      <Route path="/writing" element={<Navigate to="/blog" replace />} />
      <Route path="/writing/:slug" element={<LegacyWritingRedirect />} />
      <Route path="/services/ai" element={<ServiceAI />} />
      <Route path="/services/web" element={<ServiceWeb />} />
      <Route path="/services/infrastructure" element={<ServiceInfrastructure />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/mentions-legales" element={<LegalNotice />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>;
}
export default function App() {
  useSmoothScroll();
  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <CustomCursor />
    <SiteAnalytics />
    <Nav />
    <main id="main-content" tabIndex={-1}><Shell /></main>
    <Footer />
  </>;
}
