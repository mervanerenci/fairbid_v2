// styling
import styled from 'styled-components/macro';

// components
import Logo from '@components/Logo';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

// hooks
import {useFilterContext} from '@contexts/filterContext';
import {useSidebarContext} from '@contexts/sidebarContext';

const StyledDrawer = styled(SwipeableDrawer)`
  z-index: 10000 !important;

  .MuiDrawer-paper {
    max-width: 460px;
    width: 100%;
    padding: 40px 20px;
    background: var(--bg-primary);
  }
  
  @media screen and (min-width: 768px) {
    .MuiDrawer-paper {
      padding: 40px 30px;
    }
  }
`;

const ResponsiveSidebar = ({children, isMain = false}) => {
    const filterContext = useFilterContext() || {};

    const mainProps = {
        open: useSidebarContext().isSidebarOpen,
        onClose: useSidebarContext().closeSidebar,
        onOpen: useSidebarContext().openSidebar,
    }

    const filterProps = {
        open: filterContext.isSidebarOpen,
        onClose: filterContext.closeSidebar,
        onOpen: filterContext.openSidebar,
    }

    const Header = ({isMain}) => {
       return (
           <div className="d-flex justify-content-between align-items-center" style={{marginBottom: 30}}>
               {isMain ? <Logo/> : <h4>Filters</h4>}
               <button className="btn btn--icon btn--icon-sm" onClick={isMain ? mainProps.onClose : filterProps.onClose}>
                   <i className="icon icon-xmark"/>
               </button>
           </div>
       )
    }

    return (
        <StyledDrawer {...(isMain ? mainProps : filterProps)}>
            <Header isMain={isMain}/>
            {children}
        </StyledDrawer>
    )
}

export default ResponsiveSidebar