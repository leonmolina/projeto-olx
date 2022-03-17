import { useRoutes, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";
import AddAd from "./pages/AddAd";

import { isLogged } from './helpers/AuthHandler';

export const RouteList = () => {
    let logged = isLogged();
    return useRoutes([
        { path: '*', element: <NotFound />},
        { path: '/', element: <Home /> },
        { path: '/about', element: <About />},
        { path: '/signin', element: <SignIn />},
        { path: '/signup', element: <SignUp />},
        { path: '/ad/:id', element: <AdPage />},
        { path: '/post-an-ad', element: logged ? <AddAd /> : <Navigate to="/signin" />}
    ]);
}