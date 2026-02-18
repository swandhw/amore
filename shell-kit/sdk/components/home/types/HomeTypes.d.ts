import type { AppRoute } from '@/routes/Routes';
export type HomeMenuItem = {
    id: string;
    label: string;
    route: AppRoute;
    keepMounted?: boolean;
};
export type HomeTab = HomeMenuItem;
export type HomeDomainMenu = {
    id: string;
    name: string;
    menus: HomeMenuItem[];
};
declare const HOME_TAB_MENU_TABS: readonly ["menu", "mymenu"];
export type HomeTabMenuTab = typeof HOME_TAB_MENU_TABS[number];
export declare function isHomeTabMenuTab(value: string): value is HomeTabMenuTab;
export {};
