import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActive,
  onUpdateEvent,
} from "../../../src/store";
import {
  calendarWithEventsState,
  initialState,
  events,
  calendarWithActiveEventState,
} from "../../fixtures/calendarStates";

describe("pruebas en calendarSlice", () => {
  test("debe retornar el estado inicial", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("onSetActive debe de activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActive(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });

  test("onAddNewEvent debe de agregar el evento", () => {
    const newEvent = {
      id: "3",
      title: "Cumpleaños de Madre",
      notes: "Comprar los audifonos",
      start: new Date("2024-4-19 17:00:00"),
      end: new Date("2024-4-19 19:00:00"),
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );

    expect(state.events).toEqual([...events, newEvent]);
  });

  test("onUpdateEvent debe de agregar el evento", () => {
    const updatedEvent = {
      id: "1",
      title: "Cumpleaños de Madre",
      notes: "Comprar los audifonos",
      start: new Date("2024-4-19 17:00:00"),
      end: new Date("2024-4-20 20:00:00"),
    };

    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );

    expect(state.events).toContain(updatedEvent);
  });

  test("onDeleteEvent Debe de borrar el evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );

    expect(state.events).toEqual(
      calendarWithActiveEventState.events.filter(
        (event) => event.id !== calendarWithActiveEventState.activeEvent.id
      )
    );
  });

  test("onLoadEvents debe de establecer los eventos", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.events).toEqual(events);
  });

  test("onLogoutCalendar debe de limpiar el estado", () => {
    // calendarWithActiveEventState
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onLogoutCalendar()
    );

    expect(state).toEqual(initialState);
  });
});
