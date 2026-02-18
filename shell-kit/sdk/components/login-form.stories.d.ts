import type { StoryObj } from "@storybook/react";
import { LoginForm } from "./login-form";
declare const meta: {
    title: string;
    component: typeof LoginForm;
    tags: string[];
    argTypes: {
        onUserIdChange: {
            action: string;
        };
        onPasswordChange: {
            action: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Filled: Story;
export declare const Pending: Story;
export declare const Error: Story;
