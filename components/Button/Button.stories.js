/* eslint-disable import/no-anonymous-default-export */
import Button from "./Button";

export default {
    title: "Components/Button",
    component: Button,
    argTypes: { handleClick: {action: "handleClick"}},
}


const Template = args => <Button {...args}/>

export const Red = Template.bind({});

Red.args = {
    backgroundColor: "red",
    label: "Press Me",
    size: "lg",
    isRounded: true,
    isBordered: false,
    borderColor: 'black',
    color: 'white'
}