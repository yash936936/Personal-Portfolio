import Hero from "../components/sections/Hero";
import LogoMarquee from "../components/sections/LogoMarquee";
import Services from "../components/sections/Services";
import ApproachStrip from "../components/sections/ApproachStrip";
import Faq from "../components/sections/Faq";
import Press from "../components/sections/Press";
import ContactBand from "../components/sections/ContactBand";
import { FeaturedProjects } from "../components/sections/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <FeaturedProjects />
      <ApproachStrip />
      <Services />
      <Faq />
      <Press />
      <ContactBand />
    </>
  );
}
