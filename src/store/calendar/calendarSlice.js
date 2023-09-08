import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
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
    onSetActive: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
  },
});
// Action creators are generated for each case reducer function
export const { onSetActive, onAddNewEvent } = calendarSlice.actions;

// export default calendarSlice.reducer;
