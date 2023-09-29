import { authSlice } from "../../../src/store";
import { initialState } from "../../fixtures/authStates";

describe("pruebas en authSlice", () => {
  test("debe regresar el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
});
