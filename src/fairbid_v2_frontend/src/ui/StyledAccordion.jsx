// styling
import styled from 'styled-components/macro';

// components
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

export const StyledAccordion = styled(Accordion)`
  background: transparent !important;
  box-shadow: none !important;
  margin: 0 !important;

  &:before {
    display: none;
  }
`;

export const StyledAccordionSummary = styled(AccordionSummary)`
  padding: 0 !important;
  color: var(--text-light) !important;
  min-height: 0 !important;

  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 !important;

    .icon {
      transition: all var(--transition);
      will-change: transform;

      &:hover {
        color: var(--accent);
      }
    }

    &.Mui-expanded .icon {
      transform: rotate(180deg);
    }
  }
`;

export const StyledAccordionDetails = styled(AccordionDetails)`
  padding: 0 !important;
`;