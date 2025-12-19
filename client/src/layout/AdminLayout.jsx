import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { useAuthStore } from "../store/useAuthStore";

const AdminLayout = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) return null;

  if (!authUser) {
    return <Navigate to="/admin/login" replace />;
  }

  if (authUser.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
