import CountDown from "./CountDown";

export default {
    title: "Components/CountDown",
    component: CountDown,
}

const Template = args => <CountDown {...args} />

export const CountDefault = Template.bind({});

CountDefault.args = {
    totalCount: 40,
    prefix: 'Mulai',
    postfix: 'Detik',
}