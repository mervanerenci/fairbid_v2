// components
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {NavLink} from 'react-router-dom';

// hooks
import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

// utils
import classNames from 'classnames';

const BreadcrumbsNav = () => {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const path = location.pathname.split('/');
        const pathArray = path.map((item, index) => {
            return {
                name: item === '' ? 'Home' : item.replace(/-/g, ' '),
                path: item === '' ? '/' : path.slice(0, index + 1).join('/'),
            }
        });
        setBreadcrumbs(pathArray);
    }, [location]);

    return (
        <Breadcrumbs separator="•" sx={{
            color: 'var(--text)',
            textTransform: 'capitalize',
            '& .MuiBreadcrumbs-separator': {
                color: 'var(--accent)',
            }}}>
            {
                breadcrumbs.map((item, index) => (
                    <NavLink className={classNames('text-bold link-hover', {
                        'text-accent disabled': item.path === location.pathname,
                        'text-uppercase': item.name === 'faq',
                    })}
                          key={item.path}
                          to={item.path}>
                        {item.name}
                    </NavLink>
                ))
            }
        </Breadcrumbs>
    );
}

export default BreadcrumbsNav