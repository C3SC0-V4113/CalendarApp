import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";

import { useAuthStore } from "../../src/hooks";
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";
import calendarApi from "../../src/api/calendarApi";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("pruebas en useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({ ...initialState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: "checking",
      user: {},
      errorMessage: undefined,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });

  test("startLogin debe realizar el login correctamente", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { uid: "6515ca0b87066fbb8f1534e2", name: "Test User" },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe de fallar la autenticación", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        email: "algo@google.com",
        password: "1234567",
      });
    });

    const { errorMessage, status, user } = result.current;

    expect(localStorage.getItem("token")).toBeNull();

    expect({ errorMessage, status, user }).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: expect.any(String),
    });

    await waitFor(() => {
      expect(result.current.errorMessage).toBe(undefined);
    });
  });

  test("startRegister debe de crear un usuario", async () => {
    const newUser = {
      email: "algo@google.com",
      password: "1234567",
      name: "Test User 2",
    };
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "SOME_UID",
        name: "Test User 2",
        token: "SOME_TOKEN",
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "Test User 2", uid: "SOME_UID" },
    });

    spy.mockRestore();
  });

  test("startRegister debe de fallar la creacion", async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: "Un usuario ya existe con ese correo",
      status: "not-authenticated",
      user: {},
    });
  });
});
