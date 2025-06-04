import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Header from '../Header/Header';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Suspense fallback={<p>Loading...</p>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth">
                            <Route path="register" />
                            <Route path="login" />
                        </Route>
                        <Route path="/news" />
                        <Route path="/notices" />
                        <Route path="/friends" />
                    </Routes>
                </Suspense>
            </main>
        </>
    );
}
