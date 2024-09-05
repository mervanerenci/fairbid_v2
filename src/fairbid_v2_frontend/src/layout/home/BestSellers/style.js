import styled from 'styled-components/macro';
import breakpoints from '../../../../../xchain/src/styles/breakpoints';

const SellersGrid = styled.div`
  .seller {
   
  }

  // --- small mobile landscape ---

  ${breakpoints.sm} {
    
  }

  // --- tablet landscape ---

  ${breakpoints.lg} {
    grid-template-columns: repeat(3, 1fr);
  }

  // --- desktop ---

  ${breakpoints.xxl} {
    grid-template-columns: repeat(4, 1fr);
  }

  // --- large desktop ---

  ${breakpoints.xxxl} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default SellersGrid