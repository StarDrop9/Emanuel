import React, { useState, useCallback, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Desktophome from "../../components/Desktophome";
import Mobilehome from "../../components/Mobilehome";
import { DeviceSize } from "../../components/Responsive";
import { HeroContainer, HeroContent, HeroBtnWrapper } from "./HeroElements";

function HeroSection({ onParableChange }) {
  const [hover, setHover] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });
  const [currentParable, setCurrentParable] = useState("I Am");
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

  const speakText = useCallback(async (text) => {
    try {
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${process.env.REACT_APP_ELEVEN_LABS_VOICE_ID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": process.env.REACT_APP_ELEVEN_LABS_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
            voice_settings: {
              stability: 0.75,
              similarity_boost: 0.75,
              style: 0.0,
              speaking_rate: 0.9,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error("Error:", error);
    }
  }, []);

  const changeSaying = useCallback(
    async (newSaying) => {
      setCurrentParable(newSaying);
      await speakText(newSaying);
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
    interval = setInterval(async () => {
      if (isActive) {
        const randomSaying =
          parables[Math.floor(Math.random() * parables.length)];
        await changeSaying(randomSaying);
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
