import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ title, actions, can, }: import("./types/commonControlTypes").CommonButtonsProps) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
    argTypes: {
        can: {
            action: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
