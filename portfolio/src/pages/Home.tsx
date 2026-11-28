import Hero from "../components/sections/Hero";
import LogoMarquee from "../components/sections/LogoMarquee";
import SkillsRotator from "../components/sections/SkillsRotator";
import Services from "../components/sections/Services";
import FeaturedWork from "../components/sections/FeaturedWork";
import ApproachStrip from "../components/sections/ApproachStrip";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/sections/CtaBand";
import ContactBand from "../components/sections/ContactBand";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <FeaturedWork />
      <ApproachStrip />
      <SkillsRotator />
      <Faq />
      <CtaBand />
      <ContactBand />
    </>
  );
}
