// styled components
import {BasicSelect, MinimalSelect} from './style';

// components
import {components} from 'react-select';

// hooks
import {useState} from 'react';

// utils
import classNames from 'classnames';
import {memo} from 'react';

const CustomSelect = ({options, selected, setSelected, placeholder, variant, className, ...props}) => {
    const SelectComponent = variant === 'minimal' ? MinimalSelect : BasicSelect;

    const [uniqueId] = useState(
        () => 'select_' + Math.random().toFixed(5).slice(2),
    );

    // customize dropdown icon
    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <i className="icon-angle-down"/>
            </components.DropdownIndicator>
        );
    }

    const SingleValue = (props) => {
        return (
            <components.SingleValue {...props}>
                <span>{props.children}</span>
            </components.SingleValue>
        );
    }

    return (
        <SelectComponent value={selected}
                         onChange={setSelected}
                         options={options}
                         isSearchable={false}
                         openMenuOnFocus={true}
                         blurInputOnSelect={true}
                         onMenuClose={() => {
                             const menuEl = document.querySelector(`#${props.id || uniqueId} .select__menu`);
                             const containerEl = menuEl?.parentElement;
                             const clonedMenuEl = menuEl?.cloneNode(true);

                             if (!clonedMenuEl) return;

                             clonedMenuEl.classList.add('close');
                             clonedMenuEl.addEventListener('animationend', () => {
                                 containerEl?.removeChild(clonedMenuEl);
                             });

                             containerEl?.appendChild(clonedMenuEl);
                         }}
                         instanceId="custom-select"
                         classNamePrefix="select"
                         className={classNames('select', className)}
                         components={{DropdownIndicator, SingleValue}}
                         placeholder={placeholder || null}/>
    )
}

export default memo(CustomSelect);