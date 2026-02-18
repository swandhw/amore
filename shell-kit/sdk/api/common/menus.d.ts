import type { Role } from '@/constants/roles';
export type PageRes = {
    id: string;
    name: string;
    path: string;
    requiredRoles: Role[];
    domainId: string;
    lv1Name: string;
};
export type PagesRes = {
    pages: PageRes[];
};
export declare const fetchAccessiblePages: () => Promise<PagesRes>;
