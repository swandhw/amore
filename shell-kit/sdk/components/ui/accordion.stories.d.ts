import type { StoryObj } from "@storybook/react";
import { Accordion } from "./accordion";
declare const meta: {
    title: string;
    component: typeof Accordion;
    tags: string[];
    argTypes: {
        type: {
            control: "radio";
            options: string[];
            description: string;
        };
        collapsible: {
            control: "boolean";
            description: string;
        };
        disabled: {
            control: "boolean";
            description: string;
        };
        dir: {
            control: "radio";
            options: string[];
            description: string;
        };
        orientation: {
            control: "radio";
            options: string[];
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Multiple: Story;
