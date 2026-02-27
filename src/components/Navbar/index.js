import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
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
import { GearBtn, VoicePanel } from "../HeroSection/HeroElements";

const Navbar = ({ toggle, onVoiceChange }) => {
  const [scrollNav, setScrollNav] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [rate, setRate] = useState(0.9);

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        setSelectedVoiceName((cur) => {
          if (cur) return cur;
          const preferred =
            v.find((x) => x.name === "Google UK English Female") ||
            v.find((x) => x.name === "Samantha") ||
            v.find((x) => x.name.includes("Google US English")) ||
            v.find((x) => x.name.includes("Google"));
          return preferred ? preferred.name : v[0].name;
        });
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  useEffect(() => {
    if (onVoiceChange) onVoiceChange({ name: selectedVoiceName, rate });
  }, [selectedVoiceName, rate, onVoiceChange]);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);

    //kps add 09/25 clean up function
    return window.removeEventListener("scroll", changeNav);
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo onClick={toggleHome} to="/">
              Emanuel
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars color="#21adad" />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to="about"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  About
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="discover"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Discover
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="services"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Services
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="signup"
                  smooth={true}
                  duration={500}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  Get Started!
                </NavLinks>
              </NavItem>
            </NavMenu>
            {/* <NavBtn>
              <NavBtnLink to="/signin">Sign In</NavBtnLink>
            </NavBtn> */}
            <GearBtn onClick={() => setSettingsOpen((o) => !o)} title="Voice settings" style={{ position: "relative", top: "auto", right: "auto", marginLeft: "12px" }}>
              <FiSettings />
            </GearBtn>
          </NavbarContainer>
        </Nav>
        {settingsOpen && (
          <VoicePanel>
            <h4>Voice Settings</h4>
            <select value={selectedVoiceName} onChange={(e) => setSelectedVoiceName(e.target.value)}>
              {voices.map((v) => (
                <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
              ))}
            </select>
            <label>
              Speed: {rate.toFixed(1)}x
              <input type="range" min="0.5" max="1.5" step="0.1" value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))} />
            </label>
          </VoicePanel>
        )}
      </IconContext.Provider>
    </>
  );
};

export default Navbar;
