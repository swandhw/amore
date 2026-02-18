import type { StoryObj } from "@storybook/react";
import { Item } from "./item";
declare const meta: {
    title: string;
    component: typeof Item;
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const List: Story;
