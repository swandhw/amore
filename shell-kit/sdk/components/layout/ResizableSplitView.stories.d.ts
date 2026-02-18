import type { StoryObj } from "@storybook/react";
declare const meta: {
    title: string;
    component: ({ direction, size, defaultSize, minSize, maxSize, onSizeChange, className, primary, secondary, }: import("./ResizableSplitView").ResizableSplitViewProps) => import("react/jsx-runtime").JSX.Element;
    tags: string[];
    argTypes: {
        direction: {
            control: "radio";
            options: string[];
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Vertical: Story;
