import { useDispatch, useSelector } from "react-redux";
import caledarApi from "../api/calendarApi";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  const startLogin = async ({ email, password }) => {
    console.log({ email, password });

    try {
      const resp = await caledarApi.post("/auth", { email, password });
      console.log(resp);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    /** Propiedades */
    status,
    user,
    errorMessage,
    /** Metodos */
    startLogin,
  };
};
