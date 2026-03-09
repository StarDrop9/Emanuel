import { useState, useCallback, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import Desktophome from "../../components/Desktophome";
import Mobilehome from "../../components/Mobilehome";
import { DeviceSize } from "../../components/Responsive";
import { HeroContainer, HeroContent, HeroBtnWrapper } from "./HeroElements";

function HeroSection({ onParableChange, voiceConfig }) {
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const [currentParable, setCurrentParable] = useState("I Am. Before Abraham was born, I am!");
  const voiceConfigRef = useRef(voiceConfig);
  useEffect(() => { voiceConfigRef.current = voiceConfig; }, [voiceConfig]);

  const [parables] = useState([
    // John 8:58
    "I Am. Before Abraham was born, I am!",
    // Matt 28:20
    "And surely I am with you always, to the very end of the age.",
    // Psalm 46:10
    "Be still, and know that I am God.",
    // John 10:30
    "I and the Father are one.",
    // John 14:9
    "Whoever has seen me has seen the Father.",
    // John 17:3
    "Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent.",
    // John 10:27
    "My sheep listen to my voice; I know them, and they follow me.",
    // Mark 12:30
    "Love God with all your heart, mind, soul and strength!",
    // Matt 5:3
    "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
    // Matt 5:8
    "Blessed are the pure in heart, for they will see God.",
    // Matt 5:7
    "Blessed are the merciful, for they will be shown mercy.",
    // John 13:34
    "Love one another as I have loved you.",
    // John 14:6
    "I am the way, the truth, and the life. No one comes to the Father except through me.",
    // Matt 11:28
    "Come to me, all you who are weary and burdened, and I will give you rest.",
    // John 16:33
    "In this world you will have trouble. But take heart! I have overcome the world.",
    // John 8:12
    "I am the light of the world. Whoever follows me will never walk in darkness, but will have the light of life.",
    // John 11:25
    "I am the resurrection and the life. The one who believes in me will live, even though they die.",
    // John 15:5
    "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit.",
    // Matt 5:16
    "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven.",
    // Matt 7:7
    "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you.",
    // John 10:10
    "I have come that they may have life, and have it to the full.",
    // John 3:16
    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    // Matt 18:3
    "Truly I tell you, unless you change and become like little children, you will never enter the kingdom of heaven.",
    // John 15:13
    "Greater love has no one than this: to lay down one's life for one's friends.",
    // Matt 20:28
    "The Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.",
    // Proverbs 3:6 (God speaking)
    "In all your ways submit to me, and I will make your paths straight.",
    // John 14:27
    "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
  ]);

  const speakText = useCallback(
    (text, onEnd) => {
      if (!("speechSynthesis" in window)) {
        if (onEnd) onEnd();
        return;
      }
      const config = voiceConfigRef.current;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = config?.rate ?? 0.9;
      utterance.pitch = 1.0;
      const v = window.speechSynthesis.getVoices();
      const name = config?.name;
      const match = name && v.find((x) => x.name === name);
      if (match) utterance.voice = match;
      if (onEnd) utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
    },
    [] // stable — reads voiceConfig via ref at call time
  );

  const changeSaying = useCallback(
    (newSaying, onEnd) => {
      setCurrentParable(newSaying);
      speakText(newSaying, onEnd);
      if (onParableChange) onParableChange(newSaying);
    },
    [onParableChange, speakText]
  );

  useEffect(() => {
    let isActive = true;
    let started = false;
    let timeoutId;
    let fallbackId;

    const scheduleNext = (delay = 2000) => {
      if (isActive) timeoutId = setTimeout(speakNext, delay);
    };

    const speakNext = () => {
      if (!isActive) return;
      clearTimeout(fallbackId);
      const randomSaying = parables[Math.floor(Math.random() * parables.length)];
      const wordCount = randomSaying.split(" ").length;
      const fallbackMs = (wordCount / (voiceConfigRef.current?.rate ?? 0.9)) * 600 + 4000;
      changeSaying(randomSaying, () => {
        clearTimeout(fallbackId);
        scheduleNext();
      });
      fallbackId = setTimeout(scheduleNext, fallbackMs);
    };

    const startCycle = () => {
      if (!isActive || started) return; // prevent double-fire
      started = true;
      clearTimeout(timeoutId);
      const first = parables[0];
      const wordCount = first.split(" ").length;
      const fallbackMs = (wordCount / (voiceConfigRef.current?.rate ?? 0.9)) * 600 + 4000;
      changeSaying(first, () => {
        clearTimeout(fallbackId);
        scheduleNext();
      });
      fallbackId = setTimeout(speakNext, fallbackMs);
    };

    const delayedStart = () => {
      timeoutId = setTimeout(() => {
        if ("speechSynthesis" in window) {
          const voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            startCycle();
          } else {
            window.speechSynthesis.addEventListener("voiceschanged", startCycle, { once: true });
            timeoutId = setTimeout(startCycle, 1500);
          }
        } else {
          startCycle();
        }
      }, 2000);
    };

    delayedStart();

    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      clearTimeout(fallbackId);
      if ("speechSynthesis" in window) {
        window.speechSynthesis.removeEventListener("voiceschanged", startCycle);
        window.speechSynthesis.cancel();
      }
    };
  }, [parables, changeSaying]);

  return (
    <HeroContainer id="home">
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
