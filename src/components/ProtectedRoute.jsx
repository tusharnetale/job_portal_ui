import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, role }) {
  const { user, token } = useSelector(
    (state) => state.auth
  );

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && user?.role !== role) {
    return <Navigate to="/jobs" />;
  }

  return children;
}

export default ProtectedRoute;