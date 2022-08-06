/* eslint-disable import/no-anonymous-default-export */
import SelectOption from "./SelectOption";

export default {
    title: 'Components/SelectOption',
    component: SelectOption,
    argTypes: {}
}


const Template = args => <SelectOption {...args} />

const defaultOpt = Template.bind({});

defaultOpt.args = {
    value: { value: 'vanilla', label: 'Vanilla' }
}