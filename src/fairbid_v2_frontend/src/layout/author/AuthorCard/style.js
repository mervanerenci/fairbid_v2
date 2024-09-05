import styled from 'styled-components/macro';
import cover from '@assets/author/cover.webp';

const StyledAuthorCard = styled.div`
  .container {
    max-width: 940px;
  }

  .cover {
    height: 200px;
    background: url("${cover}") no-repeat center center / cover fixed;
  }

  .main {
    margin-top: -80px;
    border: 1px solid var(--divider);
    padding: 20px;
    overflow: visible;
    text-align: center;

    &_header {
      margin-top: -70px;
      flex-direction: column;
      align-items: center;
      gap: 20px;

      .avatar-wrapper {
        width: 100px;
        margin: 0 auto;

        .verified {
          width: 20px;
        }
      }

      &-follow .btn {
        width: 50px;
        padding: 0;
        will-change: transform;
        transition: all var(--transition);
      }

      &-actions .btn {
        color: var(--text);
      }
    }

    &_info {
      &-id {
        gap: 10px 25px;
        margin: 5px 0 20px;
      }

      &-bio {
        margin-top: 20px;

        .text {
          max-height: 100px;
          overflow: hidden;
        }

        .trigger {
          color: var(--divider);
          transition: color var(--transition);

          &:hover {
            color: var(--text-light);
          }
        }
      }

      &-id, &-socials {
        justify-content: center;
      }
    }
  }

  @media screen and (min-width: 768px) {
    .cover {
      height: 300px;
    }

    .main {
      padding: 60px;
      text-align: left;

      &_header {
        margin-top: -100px;
        flex-direction: row;
        align-items: flex-end;
        gap: 30px;

        .avatar-wrapper {
          width: 140px;
          margin: 0;

          .verified {
            width: 30px;
          }
        }

        &-follow {
          flex-grow: 1;

          .btn {
            width: fit-content;
            padding: 0 35px;
          }
        }
      }

      &_info {
        &-id, &-socials {
          justify-content: flex-start;
        }
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .main {
      padding: 80px;

      &_header {
        margin-top: -130px;

        .avatar-wrapper {
          width: 170px;

          .verified {
            width: 40px;
          }
        }
      }
    }
  }
`;

export default StyledAuthorCard