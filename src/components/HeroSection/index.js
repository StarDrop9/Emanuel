import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { useMediaQuery } from "react-responsive";
import Desktophome from "../../components/Desktophome";
import Mobilehome from "../../components/Mobilehome";
import { DeviceSize } from "../../components/Responsive";
import { HeroContainer, HeroContent, HeroBtnWrapper, GearBtn, VoicePanel } from "./HeroElements";
import { FiSettings } from "react-icons/fi";

function HeroSection({ onParableChange }) {
  const [hover, setHover] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const [currentParable, setCurrentParable] = useState("I Am");
  const [voices, setVoices] = useState([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState("");
  const [rate, setRate] = useState(0.9);
  const [settingsOpen, setSettingsOpen] = useState(false);
  //const [isPlaying, setIsPlaying] = useState(false);

  const [parables] = useState([
    "I Am",
    "I Was",
    "With You I WILL BE",
    "Be still, and know that I am God",
    "This is my Son, whom I Love.",
    "With him I am well pleased!",
    "You can only come to me through my Son!",
    "Now this is eternal life: that you know me",
    "The only true God,",
    "And Jesus Christ, whom I have sent",
    "Listen To the words of my Son",
    "Love God with all your heart, mind, soul and strength!",
    "Blessed are the poor in spirit for theirs is the kingdom of heaven.",
    "Blessed are the pure in heart for they will see God.",
    "Blessed are the merciful for they will be shown mercy.",
    "Love one and other as I have Loved You!",
    "I am the way, the truth, and the life. No one comes to the Father, except through me!",
    "Come to me all who are weary and burdened and I will give you rest.",
    "Consider it pure joy, my brothers and sisters,whenever you face trials of many kinds",
    "In the darkness of adversity, you are able to see more clearly the radiance of My face.",
    "Remember that you have an eternity of trouble-free living awaiting you in Heaven.",
    "in all your ways submit to me,and I will make your paths straight",
    "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
    "For in Christ all the fullness of the Deity lives in bodily form, and in Christ you have been brought to fullness. He is the head over every power and authority.",
    "Let everything that has breath praise the Lord.",
    "For you know the grace of our Lord Jesus Christ, that though he was rich, yet for your sake he became poor, so that you through his poverty might become rich.",
    "Those who hope in the Lord will renew their strength.They will soar on wings like eagles",
    "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
    "The Lord your God is with you, the Mighty Warrior who saves.",
    "He will take great delight in you in his love he will no longer rebuke you, but will rejoice over you with singing.",
    "I died for you",
    "Worthy is the lamb who was sacrificed for you.",
    "And my Father raised me from death to live forever at his side.",
    "but those who hope in the Lord will renew their strength.",
    "They will soar on wings like eagles, they will run and not grow weary,they will walk and not be faint.",
    "Finally, brothers and sisters, whatever is true, whatever is noble, whatever is right, whatever is pure, whatever is lovely, whatever is admirable—if anything is excellent or praiseworthy—think about such things.",
  ]);

  // eslint-disable-next-line
  const onHover = () => {
    setHover(!hover);
  };

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) {
        setVoices(v);
        const preferred =
          v.find((x) => x.name === "Google UK English Female") ||
          v.find((x) => x.name === "Samantha") ||
          v.find((x) => x.name.includes("Google US English")) ||
          v.find((x) => x.name.includes("Google"));
        setSelectedVoiceName((cur) => cur || (preferred ? preferred.name : v[0].name));
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }, []);

  const speakText = useCallback(
    (text) => {
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate;
      utterance.pitch = 1.0;
      const v = window.speechSynthesis.getVoices();
      const match = selectedVoiceName && v.find((x) => x.name === selectedVoiceName);
      if (match) utterance.voice = match;
      window.speechSynthesis.speak(utterance);
    },
    [rate, selectedVoiceName]
  );

  const changeSaying = useCallback(
    (newSaying) => {
      setCurrentParable(newSaying);
      speakText(newSaying);
      if (onParableChange) {
        onParableChange(newSaying);
      }
    },
    [onParableChange, speakText]
  );

  useEffect(() => {
    let isActive = true;
    let interval;

    // Start immediately with "I Am"
    changeSaying("I Am");

    // Start the interval for subsequent parables
    interval = setInterval(() => {
      if (isActive) {
        const randomSaying =
          parables[Math.floor(Math.random() * parables.length)];
        changeSaying(randomSaying);
      }
    }, 7000);

    return () => {
      isActive = false;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [parables, changeSaying]);

  return (
    <HeroContainer id="home">
      {ReactDOM.createPortal(
        <GearBtn onClick={() => { setSettingsOpen((o) => { console.log("gear clicked, settingsOpen →", !o); return !o; }); }} title="Voice settings">
          <FiSettings />
        </GearBtn>,
        document.body
      )}

      {settingsOpen && ReactDOM.createPortal(
        <VoicePanel>
          <h4>Voice Settings</h4>
          <select
            value={selectedVoiceName}
            onChange={(e) => setSelectedVoiceName(e.target.value)}
          >
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
          <label>
            Speed: {rate.toFixed(1)}x
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
            />
          </label>
        </VoicePanel>,
        document.body
      )}

      <HeroContent>
        {!isMobile && (
          <Desktophome parables={parables} currentParable={currentParable} />
        )}
        {isMobile && (
          <Mobilehome parables={parables} currentParable={currentParable} />
        )}
        <HeroBtnWrapper></HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
