import type { StoryObj } from "@storybook/react";
import HomeTabContentSection from "./HomeTabContentSection";
declare const meta: {
    title: string;
    component: typeof HomeTabContentSection;
    tags: string[];
    decorators: ((Story: any, context: any) => import("react/jsx-runtime").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const InactiveKeepMounted: Story;
export declare const InactiveNotKeepMounted: Story;
