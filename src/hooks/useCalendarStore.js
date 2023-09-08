import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onSetActive } from "../store";

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
    } else {
      // Creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  return {
    // Properties
    events,
    activeEvent,

    // Methods
    setActiveEvent,
    startSavingEvent,
  };
};
