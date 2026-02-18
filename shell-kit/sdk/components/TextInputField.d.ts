type TextInputFieldProps = {
    id: string;
    label: string;
    value: string;
    placeholder?: string;
    onValueChange: (value: string) => void;
};
declare function TextInputField({ id, label, value, placeholder, onValueChange }: TextInputFieldProps): import("react/jsx-runtime").JSX.Element;
export default TextInputField;
