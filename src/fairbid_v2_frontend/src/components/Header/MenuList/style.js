import styled from 'styled-components/macro';
import {StyledAccordionDetails} from '@ui/StyledAccordion';

export const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const AccordionDetails = styled(StyledAccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media screen and (min-width: 1440px) {
    flex-direction: row;
  }
`;

export const NavLink = styled.span`
  color: var(--text);
  font-family: var(--heading-font);
  font-weight: 600;
  font-size: var(--text-sm);
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: color var(--transition);
  cursor: pointer;

  &.cursor-default {
    cursor: default;
  }

  &.main-link {
    font-size: 17px;
  }

  .icon {
    font-size: 15px;
  }

  &:hover, &:focus, &.active {
    color: var(--accent);
  }

  @media screen and (min-width: 1170px) {
    &.main-link {
      font-size: var(--text-sm);
    }

    .icon {
      font-size: 12px;
    }
  }
`;

export const NavLinkWrapper = styled.div`
  height: 100%;
    display: flex;
    align-items: center;
`;

export const Dropdown = styled.div`
  border: 1px solid var(--divider);
  border-top: none;
  border-radius: 0 0 10px 10px;
  overflow: hidden;

  .link {
    padding: 10px 20px;
    background-color: var(--bg-primary);
    width: 100%;
    font-size: 17px;
    font-weight: 400;
    color: var(--text);
    transition: all var(--transition);

    &:not(:last-child) {
      border-bottom: 1px solid var(--divider);
    }

    &:hover, &:focus,
    &.active {
      color: var(--accent);
      background-color: var(--bg-secondary);
    }
  }
`;

export const UserLink = styled.div`
  border-radius: 50% !important;
  cursor: pointer;
  width: var(--elements-height);
  height: var(--elements-height);
  color: var(--text);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--divider);
  transition: color var(--transition);

  &:hover, &:focus {
    color: var(--text-light);
  }
`;