import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  //! will change
  const user = true;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouter;
