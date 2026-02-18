export type FormFieldType = 'text' | 'date' | 'number';
export type FormFieldSize = number | '*';
export type FormTemplateField = {
    key: string;
    label: string;
    type: FormFieldType;
    size: FormFieldSize;
    placeholder?: string;
    initialValue: string;
};
export type FormTemplateRow = {
    id: string;
    title: string;
    fields: FormTemplateField[];
};
