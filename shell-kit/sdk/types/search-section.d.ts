export type SearchFieldType = 'text' | 'select' | 'date';
export type SearchFieldOption = {
    label: string;
    value: string;
};
export type SearchFieldConfig = {
    id: string;
    label: string;
    type: SearchFieldType;
    placeholder?: string;
    options?: SearchFieldOption[];
    defaultValue?: string;
};
export type SearchSectionConfig = {
    id: string;
    title: string;
    description?: string;
    fields: SearchFieldConfig[];
};
export type SearchFieldValueState = Record<string, string>;
export type SearchFieldValue = {
    id: string;
    label: string;
    type: SearchFieldType;
    value: string;
};
