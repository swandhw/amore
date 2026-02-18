type LoginFormProps = React.ComponentProps<"form"> & {
    userId: string;
    password: string;
    onUserIdChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    isPending?: boolean;
    errorMessage?: string;
};
export declare function LoginForm({ className, userId, password, onUserIdChange, onPasswordChange, isPending, errorMessage, ...props }: LoginFormProps): import("react/jsx-runtime").JSX.Element;
export {};
