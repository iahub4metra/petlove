import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/selectors';
import { Navigate } from 'react-router';

export interface RestrictedRouteProps {
    component: React.ReactNode;
    redirectTo: string;
}

export default function RestrictedRoute({
    component: Component,
    redirectTo = '/',
}: RestrictedRouteProps) {
    const user = useSelector(selectUser);

    return user ? <Navigate to={redirectTo} /> : Component;
}
