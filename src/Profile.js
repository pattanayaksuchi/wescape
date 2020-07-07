import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name}></img>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : (
    <h2>Please Log In to see your profile</h2>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <h2>Redirecting to log in page...</h2>,
});
