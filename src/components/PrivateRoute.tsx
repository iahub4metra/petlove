import { useSelector } from 'react-redux';
import { selectUser } from '../redux/auth/selectors';
import { Navigate } from 'react-router';

export interface PrivateRouteProps {
    component: React.ReactNode;
    redirectTo: string;
}

export default function RestrictedRoute({
    component: Component,
    redirectTo = '/',
}: PrivateRouteProps) {
    const user = useSelector(selectUser);

    return user ? Component : <Navigate to={redirectTo} />;
}
