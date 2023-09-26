import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";

export const AppRouter = () => {
  // const authStatus = "not-authenticated";

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  const router = createBrowserRouter(
    status === "checking"
      ? [
          {
            path: "*",
            element: <h3>Cargando...</h3>,
          },
        ]
      : status === "not-authenticated"
      ? [
          {
            path: "/auth/*",
            element: <LoginPage />,
          },
          {
            path: "/*",
            element: <Navigate to={"/auth/*"} />,
          },
        ]
      : [
          {
            path: "/",
            element: <CalendarPage />,
          },
          {
            path: "/*",
            element: <Navigate to={"/"} />,
          },
        ]
  );
  return <RouterProvider router={router} />;
};
