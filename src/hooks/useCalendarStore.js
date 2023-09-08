import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActive,
  onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

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
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
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
