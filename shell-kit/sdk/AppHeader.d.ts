import type { AuthUser } from '@/stores/auth-store';
type AppHeaderProps = {
    isAuthenticated: boolean;
    user: AuthUser | null;
    handleLogoutClick: () => void;
};
declare const AppHeader: ({ isAuthenticated, user, handleLogoutClick }: AppHeaderProps) => import("react/jsx-runtime").JSX.Element;
export default AppHeader;
