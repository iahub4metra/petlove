import { Navigate } from 'react-router';

export interface PrivateRouteProps {
    component: React.ReactNode;
    redirectTo: string;
}

export default function RestrictedRoute({
    component: Component,
    redirectTo = '/',
}: PrivateRouteProps) {
    const token = localStorage.getItem('token');

    return token ? Component : <Navigate to={redirectTo} />;
}
