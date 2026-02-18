import type { StoryObj } from "@storybook/react";
import { Input } from "./input";
declare const meta: {
    title: string;
    component: typeof Input;
    tags: string[];
    argTypes: {
        type: {
            control: {
                type: "select";
            };
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
        placeholder: {
            control: "text";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const File: Story;
export declare const Disabled: Story;
export declare const WithLabel: Story;
