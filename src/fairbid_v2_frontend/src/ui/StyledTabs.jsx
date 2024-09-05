// styling
import styled from 'styled-components/macro';

// components
import {Tabs} from '@mui/base/Tabs';
import {TabsList} from '@mui/base/TabsList';
import {Tab} from '@mui/base/Tab';
import {TabPanel} from '@mui/base/TabPanel';
import Fade from '@mui/material/Fade';

// hooks
import {useState} from 'react';

// utils
import PropTypes from 'prop-types';

const StyledTabsList = styled(TabsList)`
  margin-bottom: 20px;
  border-bottom: 1px solid var(--divider);
  display: grid;
  grid-auto-flow: column;
`;

const StyledTab = styled(Tab)`
  text-align: center;
  color: var(--text-light);
  font-size: var(--text-sm);
  font-weight: 600;
  font-family: var(--heading-font);
  position: relative;
  padding-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    height: 4px;
    width: 100%;
    border-radius: 10px 10px 0 0;
    background: var(--accent);
    left: 0;
    bottom: 0;
    opacity: 0;
    transform: scale(0);
    transition: all var(--transition);
  }

  &[aria-selected='true']:after {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledTabs = ({tabs}) => {
    const [activeTab, setActiveTab] = useState(tabs[0].key);

    return (
        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
            <StyledTabsList>
                {
                    tabs.map(tab => (
                        <StyledTab key={`${tab.key}-control`} value={tab.key}>
                            {tab.label}
                        </StyledTab>
                    ))
                }
            </StyledTabsList>
            {
                tabs.map(tab => (
                    <TabPanel key={`${tab.key}-pane`} value={tab.key}>
                        <Fade in={activeTab === tab.key} timeout={300}>
                            <div>
                                {tab.children}
                            </div>
                        </Fade>
                    </TabPanel>
                ))
            }
        </Tabs>
    )
}

StyledTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        key: PropTypes.string.isRequired,
        children: PropTypes.node.isRequired
    })).isRequired
}

export default StyledTabs