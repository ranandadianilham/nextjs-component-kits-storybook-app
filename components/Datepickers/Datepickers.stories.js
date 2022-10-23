import Datepickers from "./Datepickers";

export default {
    title: 'Components/Datepickers',
    component: Datepickers,
}

const Template = args => <Datepickers {...args} />

export const Datepicker1 = Template.bind({});

Template.args = {
    dates: [new Date(), new Date()]
}