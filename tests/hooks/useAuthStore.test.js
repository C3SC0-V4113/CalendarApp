import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";

import { useAuthStore } from "../../src/hooks";
import { authSlice } from "../../src/store";

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
  test("debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({
      status: "checking", // authenticated, not-authenticated, checking
      user: {},
      errorMessage: undefined,
    });

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
});
