import React from 'react';
import Icon1 from './images/StandOut.gif';
import Icon2 from './images/OllieHead.gif';
import Icon3 from './images/FlossDance.png';
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP
} from './ServicesElements';

const Services = () => {
  return (
    <ServicesContainer id='services'>
      <ServicesH1>Ideal For</ServicesH1>
      <ServicesWrapper>
        <ServicesCard>
          <ServicesIcon src={Icon1} />
          <ServicesH2>NFT Artists</ServicesH2>
          <ServicesP>
            Stand out among the crowd by launching an NFT project as a brand that reward hardcore fans.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon2} />
          <ServicesH2>Entrepreneurs</ServicesH2>
          <ServicesP>
            Attract early investors by offering long term and regular distributed revenues.
          </ServicesP>
        </ServicesCard>
        <ServicesCard>
          <ServicesIcon src={Icon3} />
          <ServicesH2>Crowd Funding</ServicesH2>
          <ServicesP>
            Instead of giving discounted products to project supports, give them monetary rewards!
          </ServicesP>
        </ServicesCard>
      </ServicesWrapper>
    </ServicesContainer>
  );
};

export default Services;
