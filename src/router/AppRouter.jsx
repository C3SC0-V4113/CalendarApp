import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { CalendarPage } from "../calendar/pages";

export const AppRouter = () => {
  const authStatus = "authenticated";

  const router = createBrowserRouter(
    authStatus === "not-authenticated"
      ? [
          {
            path: "/auth/*",
            element: <LoginPage />,
          },
        ]
      : [
          {
            path: "/",
            element: <CalendarPage />,
          },
          {
            path: "/*",
            element: <Navigate to={"/auth/*"} />,
          },
        ]
  );
  return <RouterProvider router={router} />;
};
