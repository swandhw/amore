import { type SearchConditionFieldProps, type SearchConditionValue } from './SearchConditionField';
export type SearchConditionValues = Record<string, SearchConditionValue>;
type DistributiveOmit<T, K extends keyof any> = T extends any ? Omit<T, K> : never;
export type SearchConditionFieldConfig = DistributiveOmit<SearchConditionFieldProps, 'value' | 'onChange'>;
type SearchConditionFieldsProps = {
    fields: SearchConditionFieldConfig[];
    values: SearchConditionValues;
    onValuesChange?: React.Dispatch<React.SetStateAction<SearchConditionValues>>;
    className?: string;
};
declare const SearchConditionFields: (props: SearchConditionFieldsProps) => import("react/jsx-runtime").JSX.Element;
export default SearchConditionFields;
