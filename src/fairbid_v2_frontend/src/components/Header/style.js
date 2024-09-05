import styled from 'styled-components/macro';
import Headroom from 'react-headroom';

export const HeaderWrapper = styled(Headroom)`
  .headroom {
    background: var(--bg-primary);
    border-bottom: 1px solid var(--divider);
    padding: 10px 0;
    z-index: 9999 !important;
  }

  .container {
    max-width: 1760px;
  }

  .logo {
    flex: 1;

    &_text {
      display: none;
    }
  }

  @media screen and (min-width: 768px) {
    .headroom {
      padding: 0;

      header {
        flex: 1;
        height: 100px;
        display: flex;
        align-items: center;
      }
    }

    .logo {
      flex: unset;
    }

    .container {
      justify-content: space-between;
    }

    .btn--gradient {
      margin: 0 20px;
    }
  }

  @media screen and (min-width: 1024px) {
    .logo_text {
      display: block;
    }

    .search {
      width: 400px;
    }
  }

  @media screen and (min-width: 1170px) {
    .headroom header {
      height: 110px;
    }

    .main-wrapper {
      flex-grow: 1;
    }

    .form-wrapper {
      padding: 0 40px;
      margin: 0 40px;
      position: relative;

      &::before, &::after {
        content: '';
        position: absolute;
        height: 110px;
        top: -30px;
        width: 1px;
        background: var(--divider);
      }

      &::before {
        left: 0;
      }

      &::after {
        right: 0;
      }
    }

    .btn--gradient {
      margin: 0 20px 0 0;
    }
  }

  @media screen and (min-width: 1280px) {
    .container {
      height: 100%;

      .main-wrapper {
        height: 100%;
      }
    }

    .form-wrapper {
      align-self: center;
    }

    .search {
      width: 600px !important;
    }

    .btn--gradient {
      margin: 0 20px 0 0;
    }
  }

  @media screen and (min-width: 1440px) {
    .search {
      width: 240px !important;
    }

    .btn--gradient {
      margin: 0 0 0 20px;
    }
  }

  @media screen and (min-width: 1600px) {
    .search {
      width: 400px !important;
    }
  }

  @media screen and (min-width: 1920px) {
    .search {
      width: 500px !important;
    }
  }
`;