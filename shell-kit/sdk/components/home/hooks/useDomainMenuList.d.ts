import type { UseQueryOptions } from '@tanstack/react-query';
import type { DomainMenuRes } from '../api/domainMenuApi';
export declare const useDomainMenuList: <TData = DomainMenuRes>(options?: UseQueryOptions<DomainMenuRes, Error, TData>) => import("@tanstack/react-query").UseQueryResult<import("@tanstack/query-core").NoInfer<TData>, Error>;
