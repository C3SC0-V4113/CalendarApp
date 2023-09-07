import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  title: "Cumpleaños de Karla",
  notes: "Comprar los audifonos",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _uid: "123",
    name: "Francisco",
  },
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [tempEvent],
    activeEvent: null,
  },
  reducers: {
    increment: (state) => {
      state.counter += 1;
    },
  },
});
// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions;

// export default calendarSlice.reducer;
