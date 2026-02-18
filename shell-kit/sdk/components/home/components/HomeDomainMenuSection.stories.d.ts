import type { StoryObj } from "@storybook/react";
import HomeDomainMenuSection from "./HomeDomainMenuSection";
declare const meta: {
    title: string;
    component: typeof HomeDomainMenuSection;
    tags: string[];
    argTypes: {
        onDomainSelect: {
            action: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Loading: Story;
export declare const Empty: Story;
