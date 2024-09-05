import styled from 'styled-components/macro';

export const StyledAuthorItems = styled.div`
  margin: 30px 0 var(--spacer);

  .MuiTabsList-root {
    margin-bottom: 30px;
  }
`;

export const CollectionsGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (min-width: 1170px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;