import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { authStore } from "stores/authStore";

const AuthRequiredRoute: React.FC = observer(() => {
  const { currentUser } = authStore;

  return currentUser ? (
    <Outlet />
  ) : (
    <Navigate to={"/sign-in"} state={{ from: location }} />
  );
});

export default AuthRequiredRoute;
