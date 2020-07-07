import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogOutPage = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    logout();
  });
  return <div></div>;
};

export default LogOutPage;
