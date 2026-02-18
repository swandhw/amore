import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ ...props }: import("sonner").ToasterProps) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Success: Story;
export declare const Error: Story;
