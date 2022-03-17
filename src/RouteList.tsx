import { useRoutes, Navigate } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdPage from "./pages/AdPage";

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
        { path: '/post-an-ad', element: logged ? <About /> : <Navigate to="/signin" />}
    ]);
}


// return (
//     <Routes>
//         <Route path="*" element={<NotFound />}/>
//         <Route
//             path="/post-an-ad"
//             element={
//                 <RouteHandler>
//                     <About />
//                 </RouteHandler>
//             } 
//         />
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/ad/:id" element={<AdPage />} />
//     </Routes>
// )
// }