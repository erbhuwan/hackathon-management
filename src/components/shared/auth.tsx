import useAuthStore from "@/stores/auth.store";
import React from "react";
import {
  createSearchParams,
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const Protected = () => {
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!currentUser) {
      navigate({
        pathname: "/login",
        search: createSearchParams({
          callback: location.pathname,
        }).toString(),
      });
    }
  }, [currentUser, navigate, location]);

  if (!currentUser) return null;

  return <Outlet />;
};

export const Auth = () => {
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    if (currentUser) {
      navigate({
        pathname: searchParams.get("callback") ?? "/dashboard",
      });
    }
  }, [currentUser, navigate, searchParams]);

  if (currentUser) return null;

  return <Outlet />;
};
