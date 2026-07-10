import PriceLabel from "./PriceLabel";

export default {
  title: "Atoms/PriceLabel",
  component: PriceLabel,
  argTypes: {
    price: { control: "number" },
    prefix: { control: "boolean" },
  },
};

const Template = (args) => <PriceLabel {...args} />;

export const Free = Template.bind({});
Free.args = { price: 0 };

export const Thousands = Template.bind({});
Thousands.args = { price: 50000 };

export const WithPrefix = Template.bind({});
WithPrefix.args = { price: 150000, prefix: true };

export const Millions = Template.bind({});
Millions.args = { price: 5800000, prefix: true };
