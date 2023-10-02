import { Provider } from "react-redux";
import { act, renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

import { useUiStore } from "../../src/hooks";
import { uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("pruebas en useUiStore.js", () => {
  test("debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
    });
  });

  test("openDateModal debe colocar true en el isDateModalOpen", () => {
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { openDateModal } = result.current;

    act(() => {
      openDateModal();
    });

    expect(result.current.isDateModalOpen).toBeTruthy();
  });

  test("closeDateModal debe colocar false en el isDateModalOpen", () => {
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { closeDateModal } = result.current;

    act(() => {
      closeDateModal();
    });

    expect(result.current.isDateModalOpen).toBeFalsy();
  });
});
