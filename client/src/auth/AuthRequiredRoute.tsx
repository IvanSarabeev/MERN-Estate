import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

const AuthRequiredRoute = () => {
  const { currentUser } = useSelector(
    (state: RootState) => state.user.currentUser
  )!;

  return currentUser ? <Navigate to={"/sign-in"} /> : <Outlet />;
};

export default AuthRequiredRoute;
