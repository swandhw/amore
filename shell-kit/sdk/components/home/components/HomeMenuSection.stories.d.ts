import type { StoryObj } from "@storybook/react";
import HomeMenuSection from "./HomeMenuSection";
declare const meta: {
    title: string;
    component: typeof HomeMenuSection;
    tags: string[];
    argTypes: {
        onMenuSelect: {
            action: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Loading: Story;
export declare const Empty: Story;
