import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Header from '../Header/Header';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const RegistrationPage = lazy(
    () => import('../../pages/RegistrationPage/RegistrationPage'),
);
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const NotFoundPage = lazy(
    () => import('../../pages/NotFoundPage/NotFoundPage'),
);

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route
                            path="/register"
                            element={<RegistrationPage />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/news" />
                        <Route path="/notices" />
                        <Route path="/friends" />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </Suspense>
            </main>
        </>
    );
}
