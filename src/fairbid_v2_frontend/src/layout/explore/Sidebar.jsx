// styling
import styled from 'styled-components/macro';

// components
import {StyledAccordionDetails} from '@ui/StyledAccordion';
import Checkbox from '@ui/Checkbox';
import {StyledAccordionSummary, StyledAccordion} from '@ui/StyledAccordion';
import CustomSelect from '@ui/CustomSelect';
import ResponsiveSidebar from '@ui/ResponsiveSidebar';
import {Fragment} from 'react';

// hooks
import {useFilterContext} from '@contexts/filterContext';
import {useWindowSize} from 'react-use';
import {useExploreContext} from '@contexts/exploreContext';
import {useForm} from 'react-hook-form';

// constants
import {CRYPTO_CURRENCIES, CATEGORIES, TYPE, STATUS} from '@constants/explore';

const Details = styled(StyledAccordionDetails)`
  padding-bottom: 30px !important;
`;

const Sidebar = () => {
    const {
        categories,
        statuses,
        itemType,
        priceRange,
        setPriceRange,
        setChecked,
        cryptoCurrency,
        setCryptoCurrency,
        applyPriceFilter,
        setApplyPriceFilter
    } = useExploreContext();
    const {isSidebarOpen, openSidebar, closeSidebar} = useFilterContext();
    const {register, handleSubmit, reset} = useForm();
    const isDrawer = useWindowSize().width < 1024;
    const SidebarWrapper = isDrawer ? ResponsiveSidebar : Fragment;
    const wrapperProps = isDrawer ? {open: isSidebarOpen, onOpen: openSidebar, onClose: closeSidebar} : {};

    const onSubmit = () => {
        setApplyPriceFilter(true);
    }

    const onReset = () => {
        reset();
        setApplyPriceFilter(false);
        setPriceRange({min: 0, max: 0});
    }

    const Summary = ({title}) => {
        return (
            <StyledAccordionSummary>
                <h5>{title}</h5>
                <i className="icon icon-angle-down"/>
            </StyledAccordionSummary>
        );
    }

    return (
        <SidebarWrapper {...wrapperProps}>
            <div className="sidebar">
                <div className="sidebar_block pb-0">
                    <StyledAccordion defaultExpanded>
                        <Summary title="Price range"/>
                        <Details>
                            <form className="d-flex flex-column g-10" onSubmit={handleSubmit(onSubmit)}>
                                <CustomSelect className="outline"
                                              setSelected={setCryptoCurrency}
                                              options={CRYPTO_CURRENCIES}
                                              selected={cryptoCurrency}/>
                                <div className="d-grid g-10" style={{gridTemplateColumns: '1fr 1fr'}}>
                                    <input type="text"
                                           className="field field--outline w-100"
                                           placeholder="0.00"
                                           {...register('min', {
                                               required: true,
                                               min: 0,
                                               valueAsNumber: true,
                                               onChange: e => setPriceRange({...priceRange, min: e.target.value}),
                                               validate: (value) => value <= priceRange.max
                                           })}/>
                                    <input type="text"
                                           className="field field--outline w-100"
                                           placeholder="0.00"
                                           {...register('max', {
                                               required: true,
                                               min: 0,
                                               valueAsNumber: true,
                                               onChange: e => setPriceRange({...priceRange, max: e.target.value}),
                                               validate: (value) => value >= priceRange.min,
                                           })}/>
                                </div>
                                {
                                    applyPriceFilter ?
                                        <button className="btn btn--outline" onClick={onReset}>
                                            Reset
                                        </button>
                                        :
                                        <button className="btn btn--outline" type="submit">Filter</button>
                                }
                            </form>
                        </Details>
                    </StyledAccordion>
                </div>
                <div className="sidebar_block pb-0">
                    <StyledAccordion defaultExpanded>
                        <Summary title="Categories"/>
                        <Details>
                            <ul className="sidebar_list">
                                {
                                    CATEGORIES.map(category => (
                                        <li className="sidebar_list-item"
                                            key={category.value}>
                                            <Checkbox id={category.value}
                                                      onChange={() => setChecked('categories', category.value)}
                                                      checked={categories.includes(category.value)}/>
                                            <label htmlFor={category.value}>{category.label}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Details>
                    </StyledAccordion>
                </div>
                <div className="sidebar_block pb-0">
                    <StyledAccordion defaultExpanded>
                        <Summary title="Status"/>
                        <Details>
                            <ul className="sidebar_list">
                                {
                                    STATUS.map(status => (
                                        <li className="sidebar_list-item"
                                            key={status.value}>
                                            <Checkbox id={status.value}
                                                      onChange={() => setChecked('statuses', status.value)}
                                                      checked={statuses.includes(status.value)}/>
                                            <label htmlFor={status.value}>{status.label}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Details>
                    </StyledAccordion>
                </div>
                <div className="sidebar_block pb-0">
                    <StyledAccordion defaultExpanded>
                        <Summary title="Type"/>
                        <Details>
                            <ul className="sidebar_list">
                                {
                                    TYPE.map(type => (
                                        <li className="sidebar_list-item"
                                            key={type.value}>
                                            <Checkbox id={type.value}
                                                      onChange={() => setChecked('types', type.value)}
                                                      checked={itemType === type.value}/>
                                            <label htmlFor={type.value}>{type.label}</label>
                                        </li>
                                    ))
                                }
                            </ul>
                        </Details>
                    </StyledAccordion>
                </div>
            </div>
        </SidebarWrapper>
    )
}

export default Sidebar