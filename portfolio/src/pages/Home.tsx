import Hero from "../components/sections/Hero";
import LogoMarquee from "../components/sections/LogoMarquee";
import SkillsRotator from "../components/sections/SkillsRotator";
import Services from "../components/sections/Services";
import ApproachStrip from "../components/sections/ApproachStrip";
import Faq from "../components/sections/Faq";
import Press from "../components/sections/Press";
import ContactBand from "../components/sections/ContactBand";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Services />
      <SkillsRotator />
      <ApproachStrip />
      <Faq />
      <Press />
      <ContactBand />
    </>
  );
}
