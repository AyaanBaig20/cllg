import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  console.log(user);
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;