import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActive,
  onUpdateEvent,
} from "../store";
import caledarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActive(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    /**TODO: Llegar al backend */

    /**Todo Bien */
    if (calendarEvent._id) {
      // Actualizando
      dispatch(
        onUpdateEvent({
          ...calendarEvent,
        })
      );
    } else {
      // Creando
      const { data } = await caledarApi.post("/events", calendarEvent);

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    }
  };

  const startDeletingEvent = () => {
    /** TODO: LLegar al Backend */
    dispatch(onDeleteEvent());
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await caledarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
      // console.log(events);
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
