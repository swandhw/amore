import type { SearchFieldValue, SearchFieldValueState, SearchSectionConfig } from '@/types/search-section';
export declare const createSearchFieldValueState: (config: SearchSectionConfig) => SearchFieldValueState;
export declare const buildSearchFieldValues: (config: SearchSectionConfig, values: SearchFieldValueState) => SearchFieldValue[];
