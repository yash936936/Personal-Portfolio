import Hero from "../components/sections/Hero";
import {
  FocusAreas,
  FeaturedProjects,
  ResearchPreview,
  Capabilities,
  WritingPreview,
  HomeContact,
} from "../components/sections/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <FocusAreas />
      <FeaturedProjects />
      <ResearchPreview />
      <Capabilities />
      <WritingPreview />
      <HomeContact />
    </>
  );
}
