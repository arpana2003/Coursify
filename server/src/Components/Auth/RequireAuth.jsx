import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth({allowedRoles}) {
    const {isLoggedIn,role} = useSelector((state)=>state.auth);
    const location = useLocation();
//Outlet : A component from React Router that renders child routes of a parent route
    return isLoggedIn && allowedRoles.find((myRole)=> myRole == role)? (
        <Outlet />
    ) : isLoggedIn ? ( <Navigate to="/denied" />) : (<Navigate to="login" />)
}

export default RequireAuth;