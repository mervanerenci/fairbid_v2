// styling
import styled from 'styled-components/macro';

// components
import Marquee from 'react-fast-marquee';

const StyledTicker = styled.div`
  .marquee {
    text-transform: uppercase;
    font-size: 60px;
    height: 60px;
    line-height: 1;
    overflow: hidden;
    font-family: var(--heading-font);
    font-weight: 600;
    background: var(--gradient);
    -webkit-background-clip: text;
    background-clip: text;
    text-fill-color: transparent;
    -webkit-text-fill-color: transparent;

    .icon {
      font-size: 20px;
      margin: 0 15px;
    }

    &-container {
      gap: 20px;
    }
  }

  &.error {
    .marquee-container {
      gap: 0 !important;
    }
  }

  @media screen and (min-width: 768px) {
    .marquee {
      font-size: 120px;
      height: 100px;

      .icon {
        font-size: 40px;
        margin: 0 30px;
      }

      &-container {
        gap: 30px;
      }
    }
  }

  @media screen and (min-width: 1170px) {
    .marquee {
      font-size: 200px;
      height: 165px;

      &-container {
        gap: 40px;
      }
    }
    
    &.error {
      .marquee-container {
        margin-top: -165px;
      }
    }
  }
`;

const Ticker = ({text, isErrorPage = false}) => {
    return (
        <StyledTicker className={isErrorPage ? 'error' : ''}>
            <Marquee gradient={false} speed={80}>{text}</Marquee>
        </StyledTicker>
    )
}

export default Ticker