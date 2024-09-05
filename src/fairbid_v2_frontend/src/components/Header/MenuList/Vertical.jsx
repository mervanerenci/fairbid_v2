// styled components
import {Nav, NavLink, NavWrapper, AccordionDetails} from './style';
import {StyledAccordionSummary, StyledAccordion} from '@ui/StyledAccordion';

// components
import {NavLink as Link} from 'react-router-dom';
import ResponsiveSidebar from '@ui/ResponsiveSidebar';

// hooks
import {useLocation} from 'react-router-dom';

// utils
import classNames from 'classnames';
import {memo} from 'react';

const Vertical = ({links}) => {
    const location = useLocation();

    return (
        <ResponsiveSidebar isMain>
            <NavWrapper>
                <Nav>
                    {
                        links.map((item, index) => (
                            item.isSingle ?
                                <Link key={`menu-${item.name}`} to={item.url}>
                                    <NavLink className={classNames('main-link', {'active': location.pathname === item.url})}>
                                        {item.name}
                                    </NavLink>
                                </Link>
                                :
                                <StyledAccordion key={`accordion${index}`}>
                                    <StyledAccordionSummary aria-controls={`panel${index}-content`}
                                                            id={`panel${index}-header`}>
                                        <NavLink className="main-link">
                                            {item.name} <i className="icon icon-angle-down"/>
                                        </NavLink>
                                    </StyledAccordionSummary>
                                    <AccordionDetails>
                                        {
                                            item.links.map(link => (
                                                <Link key={`menu-${link.name}`} to={link.url}>
                                                    <NavLink
                                                        className={classNames('', {'active': location.pathname === link.url})}>
                                                        {link.name}
                                                    </NavLink>
                                                </Link>
                                            ))
                                        }
                                    </AccordionDetails>
                                </StyledAccordion>
                        ))
                    }
                </Nav>
            </NavWrapper>
        </ResponsiveSidebar>
    )
}

export default memo(Vertical);