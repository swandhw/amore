import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ variant, className, ...props }: import("react").HTMLAttributes<HTMLDivElement> & {
        variant?: "root" | "body" | "scroll";
    }) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
    argTypes: {
        variant: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
