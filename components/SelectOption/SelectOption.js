import Select from 'react-select';
import PropTypes from 'prop-types';

function SelectOption(OptionsData, value = { value: 'vanilla', label: 'Vanilla' }) {
    OptionsData = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return <>
        <Select options={OptionsData} value={value}/>
    </>
}

export default SelectOption;

SelectOption.propTypes = {
    OptionsData: PropTypes.array,
    value: PropTypes.object
}