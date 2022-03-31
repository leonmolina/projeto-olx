import { Navigate, useRoutes } from "react-router-dom";
import { isLogged } from './helpers/AuthHandler';
import About from "./pages/About";
import AddAd from "./pages/AddAd";
import AdPage from "./pages/AdPage/index";
import Ads from "./pages/Ads";
import Home from "./pages/Home";
import MyAccount from "./pages/MyAccount";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";



export const RouteList = () => {
    let logged = isLogged();
    return useRoutes([
        { path: '*', element: <NotFound />},
        { path: '/', element: <Home /> },
        { path: '/about', element: <About />},
        { path: '/signin', element: <SignIn />},
        { path: '/signup', element: <SignUp />},
        { path: '/ad/:id', element: <AdPage />},
        { path: '/ads', element: <Ads />},
        { path: '/post-ad', element: logged ? <AddAd /> : <Navigate to="/signin" />},
        { path: '/account', element: logged ? <MyAccount /> : <Navigate to="/signin" />}
    ]);
}