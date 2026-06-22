import Hero from "../components/sections/Hero";
import LogoMarquee from "../components/sections/LogoMarquee";
import Showcase from "../components/sections/Showcase";
import SkillsRotator from "../components/sections/SkillsRotator";
import Offers from "../components/sections/Offers";
import ApproachStrip from "../components/sections/ApproachStrip";
import Faq from "../components/sections/Faq";
import CtaBand from "../components/sections/CtaBand";
import Press from "../components/sections/Press";
import ContactBand from "../components/sections/ContactBand";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Showcase />
      <SkillsRotator />
      <Offers />
      <ApproachStrip />
      <Faq />
      <CtaBand />
      <Press />
      <ContactBand />
    </>
  );
}