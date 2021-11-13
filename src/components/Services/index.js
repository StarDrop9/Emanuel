import React from "react";
import Icon1 from "../../images/ChristWalkingOnWater.jpg";
import Icon2 from "../../images/Hope.png";
import Icon3 from "../../images/Jesus1.png";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  return (
    <ServicesContainer id="services">
      <ServicesH1>Our Services restate his Truth!</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>Faith</ServicesH2>
          <ServicesP>
            Christ strengthens your faith to overcome the world!
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Hope</ServicesH2>
          <ServicesP>Hope springs eternal as you get closer to him!</ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Love</ServicesH2>
          <ServicesP>And the greatest of these is LOVE !</ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
