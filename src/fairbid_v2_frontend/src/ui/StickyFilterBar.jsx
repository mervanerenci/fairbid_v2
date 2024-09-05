// styling
import styled from 'styled-components/macro';

// components
import Sticky from 'react-stickynode';

// hooks
import {useState} from 'react';
import {useSidebarContext} from '@contexts/sidebarContext';
import {useFilterContext} from '@contexts/filterContext';

const FilterBarWrapper = styled.div`
  width: 100%;

  .sticky-outer-wrapper.active {
    padding: 10px 0;
  }

  .sticky-inner-wrapper {
    background-color: transparent;
    will-change: transform;
    transition: all var(--transition);

    &.is-sticky {
      background-color: var(--accent);
      padding: 10px 20px;
      width: 100% !important;
      left: 0;

      button {
        color: var(--bg-primary);
      }
    }
    
    &.is-freeze {
      transform: none !important;
    }

    .icon-bars-sort {
      transform: scaleX(-1);
    }
  }
`;

const StickyFilterBar = ({icon = 'bars', bottom}) => {
    const [isSticky, setIsSticky] = useState(false);
    const [isFreeze, setIsFreeze] = useState(false);
    const {openSidebar} = useFilterContext();
    const {isHeaderFixed, headerHeight} = useSidebarContext();
    const offsetTop = isHeaderFixed ? headerHeight : 0;
    const iconClass = icon === 'bars' ? 'icon icon-bars-sort' : 'icon icon-sliders-regular';

    const handleStateChange = status => {
        setIsSticky(status.status === Sticky.STATUS_FIXED);
        setIsFreeze(status.status === Sticky.STATUS_RELEASED);
    }

    return (
        <FilterBarWrapper>
            <Sticky top={offsetTop}
                    bottomBoundary={bottom}
                    innerZ={1000}
                    innerClass={isSticky ? 'is-sticky' : (isFreeze ? 'is-freeze' : '')}
                    onStateChange={handleStateChange}>
                <button className="h4 d-flex align-items-center justify-content-between w-100" onClick={openSidebar}>
                    Filter <i className={iconClass}/>
                </button>
            </Sticky>
        </FilterBarWrapper>
    );
}

export default StickyFilterBar