import React, { useState } from "react";
//import { Button } from '../ButtonElements';
// import Video from '../../videos/video.mov';
import { useMediaQuery } from "react-responsive";
import Desktophome from "../../components/Desktophome";
import Mobilehome from "../../components/Mobilehome";
import { DeviceSize } from "../../components/Responsive";
import {
  HeroContainer,
  // HeroBg,
  //VideoBg,
  HeroContent,
  //HeroH1,
  //HeroP,
  HeroBtnWrapper,
  //ArrowForward,
  //ArrowRight
} from "./HeroElements";

function HeroSection() {
  const [hover, setHover] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: DeviceSize.mobile });

  const [parables] = useState([
    "Be still, and know that I am God",
    "This is my Son, whom I Love.",
    "With him I am well pleased!",
    "You can only come to me through my Son!",
    "Now this is eternal life: that you know me",
    "The only true God,",
    "And Jesus Christ, whom I have sent",
    "Listen To the words of my Son",
    "*Love God with all your heart, mind, soul and strength!",
    "Blessed are the poor in spirit for theirs is the kingdom of heaven.",
    "Blessed are the pure in heart for they will see God.",
    "Blessed are the merciful for they will be shown mercy.",
    "*Love one and other as I have Loved You!",
    "I am the way, the truth, and the life. No one comes to the Father, except through me!",
    "Come to me all who are weary and burdened and I will give you rest.",
    "Consider it pure joy, my brothers and sisters,whenever you face trials of many kinds",
    "In the darkness of adversity, you are able to see more clearly the radiance of My face.",
    "Remember that you have an eternity of trouble-free living awaiting you in Heaven.",
    "in all your ways submit to me,and I will make your paths straight",
    "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
    "For in Christ all the fullness of the Deity lives in bodily form, 10 and in Christ you have been brought to fullness. He is the head over every power and authority.",
    "Let everything that has breath praise the Lord.",
    "For you know the grace of our Lord Jesus Christ, that though he was rich, yet for your sake he became poor, so that you through his poverty might become rich.",
  ]);

  // eslint-disable-next-line
  const onHover = () => {
    setHover(!hover);
  };
  return (
    <HeroContainer id="home">
      {/* <HeroBg>
        <VideoBg playsInline autoPlay loop muted src={Video} type='video/mov' />
      </HeroBg> */}
      <HeroContent>
        {!isMobile && <Desktophome parables={parables} />}
        {isMobile && <Mobilehome parables={parables} />}
        {/* <HeroH1>Options Trading made Easy</HeroH1>
        <HeroP>
          Sign up for a new account today and receive $10 in credit towards
          your next payment.
        </HeroP> */}
        <HeroBtnWrapper>
          {/* <Button
            to='signup'
            smooth={true}
            duration={500}
            spy={true}
            exact='true'
            offset={-80}
            primary='true'
            dark='true'
            onMouseEnter={onHover}
            onMouseLeave={onHover}
          >
            Get Started {hover ? <ArrowForward /> : <ArrowRight />}
          </Button> */}
        </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
