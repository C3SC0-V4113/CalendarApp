import {
  authSlice,
  clearErrorMessage,
  onLogin,
  onLogout,
} from "../../../src/store";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("pruebas en authSlice", () => {
  test("debe regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("debe de realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));

    expect(state).toEqual(authenticatedState);
  });

  test("debe de realizar el LogOut", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test("debe de realizar el LogOut con error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({ ...notAuthenticatedState, errorMessage });
  });

  test("debe limpiar el mensaje de error", () => {
    const errorMessage = "Credenciales no válidas";
    const state = authSlice.reducer(
      { ...notAuthenticatedState, errorMessage },
      clearErrorMessage()
    );
    expect(state).toEqual(notAuthenticatedState);
  });
});
