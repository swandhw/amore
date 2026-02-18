import type { SearchFieldOption } from '@/types/search-section';
type SelectInputFieldProps = {
    id: string;
    label: string;
    value: string;
    options: SearchFieldOption[];
    placeholder?: string;
    onValueChange: (value: string) => void;
};
declare function SelectInputField({ id, label, value, options, placeholder, onValueChange, }: SelectInputFieldProps): import("react/jsx-runtime").JSX.Element;
export default SelectInputField;
