import Badge from "./Badge";
import cs from "@/styles/card-styles";

export default {
  title: "Atoms/Badge",
  component: Badge,
  argTypes: {
    children: { control: "text" },
    style: { control: "object" },
  },
};

const Template = (args) => <Badge {...args} />;

export const Category = Template.bind({});
Category.args = {
  children: "Alam",
  style: { ...cs.atrCat, background: "#D9F2DA", color: "#2D8838" },
};

export const Status = Template.bind({});
Status.args = {
  children: "Mandiri",
  style: { ...cs.desaStatus, background: "#D9F2DA", color: "#2D8838" },
};

export const Days = Template.bind({});
Days.args = {
  children: "4 Hari · 3 Malam",
  style: cs.itinDaysBadge,
};

export const Theme = Template.bind({});
Theme.args = {
  children: "Adventure",
  style: { ...cs.itinThemeBadge, background: "#FFE9D6", color: "#B85C00" },
};

export const Verified = Template.bind({});
Verified.args = {
  children: "✓ Verified",
  style: cs.guideVerified,
};
