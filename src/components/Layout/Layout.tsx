import { lazy, Suspense, useContext } from 'react';
import { Route, Routes } from 'react-router';
import Header from '../Header/Header';
import { PageContext } from '../Context/PageContext';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RestrictedRoute = lazy(() => import('../RestrictedRoute'));
const PrivateRoute = lazy(() => import('../PrivateRoute'));
const RegistrationPage = lazy(
    () => import('../../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(
    () => import('../../pages/NotFoundPage/NotFoundPage'),
);
const NewsPage = lazy(() => import('../../pages/NewsPage/NewsPage'));
const NoticesPage = lazy(() => import('../../pages/NoticesPage/NoticesPage'));
const OurFriendsPage = lazy(
    () => import('../../pages/OurFriendsPage/OurFriendsPage'),
);
const ProfilePage = lazy(() => import('../../pages/ProfilePage/ProfilePage'));

export default function Layout() {
    const { isHome } = useContext(PageContext);

    return (
        <>
            {!isHome && <Header />}
            <main>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/register"
                            element={
                                <RestrictedRoute
                                    component={<RegistrationPage />}
                                    redirectTo="/"
                                />
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <RestrictedRoute
                                    component={<LoginPage />}
                                    redirectTo="/"
                                />
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute
                                    component={<ProfilePage />}
                                    redirectTo="/"
                                />
                            }
                        />
                        <Route path="/news" element={<NewsPage />} />
                        <Route path="/notices" element={<NoticesPage />} />
                        <Route path="/friends" element={<OurFriendsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </main>
        </>
    );
}
