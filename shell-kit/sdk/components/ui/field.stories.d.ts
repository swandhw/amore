import type { StoryObj } from "@storybook/react";
import { Field } from "./field";
declare const meta: {
    title: string;
    component: typeof Field;
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Horizontal: Story;
export declare const Group: Story;
export declare const Set: Story;
