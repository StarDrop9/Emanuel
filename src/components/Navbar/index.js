import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";
import {
  MobileIcon,
  Nav,
  NavbarContainer,
  NavItem,
  NavLinks,
  NavLogo,
  NavMenu,
} from "./NavbarElements";
import { GearBtn, WaveBar, WaveIconWrap } from "../HeroSection/HeroElements";

const BAR_HEIGHTS = [8, 13, 18, 13, 8];
const BAR_DELAYS  = [0, 0.1, 0.2, 0.1, 0];

const Navbar = ({ toggle, onVoiceChange, voiceOn, onVoiceToggle }) => {
  const [scrollNav, setScrollNav] = useState(false);

  // Pick best available voice once on load
  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (!v.length) return;
      const preferred =
        v.find((x) => x.name.includes("Google UK English Male")) ||
        v.find((x) => x.name.includes("Google UK English Female")) ||
        v.find((x) => x.name === "Samantha") ||
        v.find((x) => x.name.includes("Google US English")) ||
        v.find((x) => x.name.includes("Google"));
      if (onVoiceChange) onVoiceChange({ name: preferred ? preferred.name : v[0].name, rate: 0.9 });
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, [onVoiceChange]);

  useEffect(() => {
    const changeNav = () => setScrollNav(window.scrollY >= 80);
    window.addEventListener("scroll", changeNav);
    return () => window.removeEventListener("scroll", changeNav);
  }, []);

  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <Nav scrollNav={scrollNav}>
        <NavbarContainer>
          <NavLogo onClick={() => scroll.scrollToTop()} to="/">
            Emanuel
          </NavLogo>
          <MobileIcon onClick={toggle}>
            <FaBars color="#21adad" />
          </MobileIcon>
          <NavMenu>
            <NavItem>
              <NavLinks to="about" smooth duration={500} spy exact="true" offset={-80}>About</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="discover" smooth duration={500} spy exact="true" offset={-80}>Discover</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="services" smooth duration={500} spy exact="true" offset={-80}>Services</NavLinks>
            </NavItem>
            <NavItem>
              <NavLinks to="signup" smooth duration={500} spy exact="true" offset={-80}>Get Started!</NavLinks>
            </NavItem>
          </NavMenu>
          <GearBtn
            onClick={onVoiceToggle}
            title={voiceOn ? "Stop voice" : "Start voice"}
            style={{ position: "relative", top: "auto", right: "auto", marginLeft: "8px", alignSelf: "center" }}
          >
            <WaveIconWrap>
              {BAR_HEIGHTS.map((h, i) => (
                <WaveBar key={i} $active={voiceOn} $h={h} $delay={BAR_DELAYS[i]} />
              ))}
            </WaveIconWrap>
          </GearBtn>
        </NavbarContainer>
      </Nav>
    </IconContext.Provider>
  );
};

export default Navbar;
