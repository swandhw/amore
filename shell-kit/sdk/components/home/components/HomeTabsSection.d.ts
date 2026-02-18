import type { HomeTab } from '../types/HomeTypes';
type HomeTabsSectionProps = {
    tabs: HomeTab[];
    activeTabId: string | null;
    onTabSelect: (tabId: string) => void;
    onTabClose: (tabId: string) => void;
};
declare function HomeTabsSection({ tabs, activeTabId, onTabSelect, onTabClose }: HomeTabsSectionProps): import("react/jsx-runtime").JSX.Element;
export default HomeTabsSection;
