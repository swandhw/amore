import type { StoryObj } from "@storybook/react";
import HomeTabsSection from "./components/HomeTabsSection";
import type { HomeTab } from './types/HomeTypes';
declare const meta: {
    title: string;
    component: typeof HomeTabsSection;
    tags: string[];
    decorators: ((Story: import("storybook/internal/csf").PartialStoryFn<import("@storybook/react").ReactRenderer, {
        tabs: HomeTab[];
        activeTabId: string | null;
        onTabSelect: (tabId: string) => void;
        onTabClose: (tabId: string) => void;
    }>) => import("react/jsx-runtime").JSX.Element)[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Empty: Story;
