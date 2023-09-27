import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActive,
  onUpdateEvent,
} from "../store";
import caledarApi from "../api/calendarApi";

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

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
