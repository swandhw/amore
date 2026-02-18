import type { SearchFieldValue, SearchFieldValueState, SearchSectionConfig } from '@/types/search-section';
type SearchSectionProps = {
    config: SearchSectionConfig;
    values: SearchFieldValueState;
    onValuesChange: (values: SearchFieldValueState) => void;
    onSearch?: (values: SearchFieldValue[]) => void;
};
declare function SearchSection({ config, values, onValuesChange, onSearch }: SearchSectionProps): import("react/jsx-runtime").JSX.Element;
export default SearchSection;
