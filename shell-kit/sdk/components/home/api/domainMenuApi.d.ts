import type { ServerPageDefinition } from '@/routes/Routes';
export type DomainMenuRes = {
    domains: {
        id: string;
        name: string;
        pages: ServerPageDefinition[];
    }[];
};
export declare const fetchDomainMenus: () => Promise<DomainMenuRes>;
