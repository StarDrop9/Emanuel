import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import InfoSection from "../components/InfoSection";
import "./Home.css";

import {
  homeObjOne,
  homeObjTwo,
  homeObjThree,
} from "../components/InfoSection/Data";
import Services from "../components/Services";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceConfig, setVoiceConfig] = useState({ name: "", rate: 0.9 });
  const [voiceOn, setVoiceOn] = useState(true);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar
        toggle={toggle}
        onVoiceChange={setVoiceConfig}
        voiceOn={voiceOn}
        onVoiceToggle={() => setVoiceOn((v) => !v)}
      />
      <HeroSection voiceConfig={voiceConfig} voiceEnabled={voiceOn} onParableChange={(parable) => console.log(parable)} />
      <InfoSection {...homeObjOne} />
      <InfoSection {...homeObjTwo} />
      <Services />
      <InfoSection {...homeObjThree} />
      <Footer />
    </>
  );
}

export default Home;
