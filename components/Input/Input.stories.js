/* eslint-disable import/no-anonymous-default-export */
import Input from "./Input";

export default {
    title: 'Components/Input',
    component: Input,
    argTypes: {}
}


const Template = args => <Input {...args} />

const defaultInput = Template.bind({});

defaultInput.args = {
    title: "Title",
    label: "Label",
    type: "text",
    placeholder: "Placeholder",
}