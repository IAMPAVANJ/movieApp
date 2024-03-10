import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
    const getUserDetails = JSON.parse(localStorage.getItem("userData"))
    return (getUserDetails ? <Outlet /> : <Navigate to="/"/>)
}
export default ProtectedRoutes;