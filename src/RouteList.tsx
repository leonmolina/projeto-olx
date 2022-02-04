import { useRoutes } from "react-router-dom";

import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export const RouteList = () => {
    return useRoutes([
        { path: '*', element: <NotFound />},
        { path: '/', element: <Home /> },
        { path: '/about', element: <About />},
        { path: '/signin', element: <SignIn />},
        { path: '/signup', element: <SignUp />}
    ]);
}