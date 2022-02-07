import { useRoutes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";

export const RouteList = () => {
    return useRoutes([
        { path: '*', element: <NotFound />},
        { path: '/', element: <Home /> },
        { path: '/about', element: <About />},
        { path: '/signin', element: <SignIn />},
        { path: '/signup', element: <SignUp />},
        { path: '/ad', element: <AdPage />}
    ]);
}