export type SearchConditionValue = string | number | Date | null;
export type SearchConditionFieldType = 'text' | 'combo' | 'date' | 'number';
type BaseProps = {
    id: string;
    label: string;
    type: SearchConditionFieldType;
    required?: boolean;
    value?: SearchConditionValue;
    onChange: (value: SearchConditionValue) => void;
};
type ComboProps = BaseProps & {
    type: 'combo';
    dataSource: unknown[];
    dataPathToText: string;
    dataPathToValue: string;
};
type TextProps = BaseProps & {
    type: 'text';
};
type NumberProps = BaseProps & {
    type: 'number';
};
type DateProps = BaseProps & {
    type: 'date';
};
export type SearchConditionFieldProps = ComboProps | TextProps | NumberProps | DateProps;
declare const SearchConditionField: (props: SearchConditionFieldProps) => import("react/jsx-runtime").JSX.Element;
export default SearchConditionField;
