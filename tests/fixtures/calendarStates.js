export const events = [
  {
    id: "1",
    title: "Cumpleaños de Padre",
    notes: "Comprar los audifonos",
    start: new Date("2023-9-29 17:00:00"),
    end: new Date("2023-9-29 19:00:00"),
  },
  {
    id: "2",
    title: "Cumpleaños de Frank",
    notes: "Comprar los audifonos",
    start: new Date("2023-10-30 17:00:00"),
    end: new Date("2023-10-30 19:00:00"),
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
