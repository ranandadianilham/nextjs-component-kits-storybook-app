import Select from 'react-select';
import PropTypes from 'prop-types';
import { useState } from 'react';

function SelectOption(OptionsData, value = { value: 'vanilla', label: 'Vanilla' }) {
    const [currentValue, setcurrentValue] = useState(value)
    OptionsData = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return <>
        <Select options={OptionsData} value={currentValue} onChange={(e) => {setcurrentValue(e)}}/>
    </>
}

export default SelectOption;

SelectOption.propTypes = {
    OptionsData: PropTypes.array,
    value: PropTypes.object
}