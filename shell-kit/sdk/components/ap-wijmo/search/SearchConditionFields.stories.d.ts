import { type SearchConditionFieldConfig, type SearchConditionValues } from './SearchConditionFields';
declare const meta: {
    title: string;
    component: (props: {
        fields: SearchConditionFieldConfig[];
        values: SearchConditionValues;
        onValuesChange?: React.Dispatch<React.SetStateAction<SearchConditionValues>>;
        className?: string;
    }) => import("react/jsx-runtime").JSX.Element;
};
export default meta;
export declare function BadCodeSearchFilter(): import("react/jsx-runtime").JSX.Element;
