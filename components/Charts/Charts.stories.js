import Charts from "./Charts";

export default {
    title: "Components/Charts",
    component: Charts,
}

const Template = args => <Charts {...args} />

const Template2 = args => <Charts.PieReport {...args} />

export const ChartPie = Template.bind({});

export const ChartPie2 = Template2.bind({});

ChartPie.args = {
    labelset: ["Africa", "Asia", "Europe", "Latin America", "North America"], 
    dataset: [2478,5267,734,784,433], 
    title: 'pie chart', 
    pieheight: 350, 
    piewidth: 400,
}

ChartPie2.args = {
    labelset: ["Africa", "Asia", "Europe", "Latin America", "North America"], 
    dataset: [2478,5267,734,784,433], 
    title: 'pie chart', 
    pieheight: 350, 
    piewidth: 400,
}