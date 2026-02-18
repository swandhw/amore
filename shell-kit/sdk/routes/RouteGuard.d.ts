import { type ReactNode } from 'react';
import type { Role } from '@/constants/roles';
type RouteGuardProps = {
    children: ReactNode;
    requiresAuth?: boolean;
    requiredRoles?: Role[];
};
declare function RouteGuard({ children, requiresAuth, requiredRoles }: RouteGuardProps): import("react/jsx-runtime").JSX.Element;
export default RouteGuard;
