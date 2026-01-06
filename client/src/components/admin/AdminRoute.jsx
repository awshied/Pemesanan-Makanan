import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

const AdminRoute = ({ children }) => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!authUser || authUser.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminRoute;
