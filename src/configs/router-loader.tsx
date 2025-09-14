import { redirect } from "react-router-dom";

export const unguardedRoute = () => {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return redirect(`/`);
  }
  return null;
};
