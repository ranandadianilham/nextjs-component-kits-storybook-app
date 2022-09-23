/* eslint-disable import/no-anonymous-default-export */
import Input from "./Input";

export default {
    title: "Components/Input",
    component: Input,
}


const Template = (args) => <Input {...args} />

export const DefaultInput = Template.bind({});

DefaultInput.args = {
    title: "Title",
    label: "Label",
    type: "text",
    placeholder: "Placeholder",
}