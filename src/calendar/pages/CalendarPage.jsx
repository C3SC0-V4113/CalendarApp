import { useState } from "react";

import { CalendarEvent, CalendarModal, Navbar } from "../components";
import { localizer, getMessagesES } from "../../helpers";

import { Calendar } from "react-big-calendar";
import { addHours } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { useUiStore } from "../../hooks";

const events = [
  {
    title: "Cumpleaños de Karla",
    notes: "Comprar los audifonos",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: "#fafafa",
    user: {
      _uid: "123",
      name: "Francisco",
    },
  },
];

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    // console.log({ event, start, end, isSelected });

    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = (event) => {
    console.log({ doubleCkick: event });
    openDateModal();
  };

  const onSelect = (event) => {
    console.log({ click: event });
  };

  const onViewChanged = (event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
    </>
  );
};
