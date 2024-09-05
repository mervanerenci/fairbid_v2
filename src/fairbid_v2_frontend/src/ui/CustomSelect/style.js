import styled, {keyframes} from 'styled-components/macro';
import Select from 'react-select';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const UnstyledSelect = styled(Select)`
  .select {
    &__control {
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      background: transparent;
      min-height: unset;

      &--is-focused {
        box-shadow: none;
      }
    }

    &__value-container {
      padding: 0;
    }

    &__single-value {
      margin: 0;
    }

    &__indicator {
      padding: 0;
      transition: color var(--transition);

      &:hover {
        color: var(--accent);
      }
    }

    &__indicator-separator {
      display: none;
    }

    &__menu {
      min-width: max-content;
      border-radius: 10px;
      background: var(--bg-tertiary);
      animation: ${fadeIn} var(--transition);

      &.close {
        animation: ${fadeIn} var(--transition) reverse;
      }
    }

    &__option {
      padding: 6px 20px;
      transition: all var(--transition);
      cursor: pointer;

      &:hover, &--is-selected {
        color: var(--text-light);
      }

      &--is-selected {
        font-weight: 500;
      }

      &--is-selected, &--is-focused {
        background: transparent;
      }
    }
  }
`;

export const BasicSelect = styled(UnstyledSelect)`
  .select {
    &__control {
      height: var(--elements-height);
      padding: 0 20px;
      border-radius: 10px;
      background: var(--bg-tertiary);
    }

    &__single-value {
      color: var(--text);
    }

    &__indicator {
      padding: 0;
      margin-left: 20px;
      transition: color var(--transition);

      &:hover {
        color: var(--accent);
      }
    }

    &__indicator-separator {
      display: none;
    }

    &__menu {
      min-width: max-content;
      border-radius: 10px;
      background: var(--bg-tertiary);
    }

    &__option {
      padding: 6px 20px;
      transition: all var(--transition);
      cursor: pointer;
      color: var(--text);

      &:hover, &--is-selected {
        color: var(--text-light);
      }

      &--is-selected {
        font-weight: 500;
      }

      &--is-selected, &--is-focused {
        background: transparent;
      }
    }
  }

  &.outline {
    .select__control {
      border: 1px solid var(--divider);
      background: transparent;
    }
  }
`;

export const MinimalSelect = styled(UnstyledSelect)`
  .select {
    &__control {
      width: fit-content;
      gap: 10px;
    }

    &__single-value {
      font-weight: 500;
      color: var(--text-light);
      font-size: var(--text-sm);
    }

    &__indicator {
      font-size: var(--text-xs);
    }
  }
`;