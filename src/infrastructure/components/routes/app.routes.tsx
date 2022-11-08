import { Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';

const Home = React.lazy(() => import('../../../features/home/page/home.page'));
const About = React.lazy(
    () => import('../../../features/about/page/about.page')
);
export function AppRoutes() {
    return (
        <Routes>
            <Route
                path="home"
                element={
                    <React.Suspense>
                        <Home></Home>
                    </React.Suspense>
                }
            ></Route>
            <Route
                path="about"
                element={
                    <React.Suspense>
                        <About></About>
                    </React.Suspense>
                }
            ></Route>
            <Route
                path=""
                element={
                    <React.Suspense>
                        <Home></Home>
                    </React.Suspense>
                }
            ></Route>
            <Route path="*" element={<Navigate replace to="" />}></Route>
        </Routes>
    );
}
