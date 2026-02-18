import type { AuthUser } from '@/stores/auth-store';
import type { Role } from '@/constants/roles';
import { type HomeDomainMenu } from './types/HomeTypes';
type HomeViewProps = {
    user: AuthUser | null;
    roles: Role[];
    domains: HomeDomainMenu[];
    isLoading: boolean;
};
declare function HomeView({ user, roles, domains, isLoading }: HomeViewProps): import("react/jsx-runtime").JSX.Element;
export default HomeView;
