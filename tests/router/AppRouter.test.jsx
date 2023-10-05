import { render, screen } from "@testing-library/react";
import { AppRouter } from "../../src/router/AppRouter";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import {
  MemoryRouter,
  Navigate,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { LoginPage } from "../../src/auth/pages/LoginPage";
import { CalendarPage } from "../../src/calendar/pages";
import { Provider } from "react-redux";
import { store } from "../../src/store";

jest.mock("../../src/hooks/useAuthStore");

describe("pruebas en <AppRouter/>", () => {
  const mockCheckAuthToken = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar la pantalla de carga y llamar checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    render(<AppRouter />);

    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  /** Aprende a hacer testing de rutas mijo */
});
