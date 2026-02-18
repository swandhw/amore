import type { HomeTab } from '../types/HomeTypes';
type HomeTabContentSectionProps = {
    tab: HomeTab;
    isActive: boolean;
    keepMounted: boolean;
};
declare function HomeTabContentSection({ tab, isActive, keepMounted }: HomeTabContentSectionProps): import("react/jsx-runtime").JSX.Element | null;
export default HomeTabContentSection;
