import type { HomeMenuItem } from '../types/HomeTypes';
type HomeMenuSectionProps = {
    menus: HomeMenuItem[];
    activeMenuId: string | null;
    isLoading: boolean;
    onMenuSelect: (menu: HomeMenuItem) => void;
};
declare function HomeMenuSection({ menus, activeMenuId, isLoading, onMenuSelect, }: HomeMenuSectionProps): import("react/jsx-runtime").JSX.Element;
export default HomeMenuSection;
