import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const queryString = location.search;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return token ? (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
        className="absolute rounded text-center top-4 right-8 bg-primary text-white px-3 py-1"
      >
        Logout
      </button>
      <Outlet />
    </div>
  ) : (
    <Navigate to={queryString ? "/signin" + queryString : "/signin"} replace={true} />
  );
};

export default ProtectedRoute;
