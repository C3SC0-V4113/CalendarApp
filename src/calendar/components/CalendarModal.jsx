import { useEffect, useMemo, useState } from "react";

import { useUiStore, useCalendarStore } from "../../hooks";

import { addHours, differenceInSeconds } from "date-fns";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getEnvVariables } from "../../helpers";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

if (getEnvVariables().VITE_MODE !== "test") {
  Modal.setAppElement("#root");
}

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "Francisco",
    notes: "Valle",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const titleClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.title.length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmitted]);

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (event, changing) => {
    console.log(event);
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    console.log("cerrando Modal");
    closeDateModal();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      // console.error("Error en fechas");
      Swal.fire("Fechas incorrectas", "Revisar fechas ingresadas", "error");
      return;
    }

    if (formValues.title.length <= 0) {
      console.error("Titulo es necesario");
      return;
    }
    console.log(formValues);

    /**TODO
     * Cerrar Modal
     * Remover Errores en pantalla
     * Resetear formulario
     */

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      className={"modal"}
      overlayClassName={"modal-fondo"}
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container col" onSubmit={onSubmit}>
        <div className="form-group row mb-2">
          <label className="form-label">Fecha y hora inicio</label>
          <DatePicker
            className="form-control"
            onChange={(event) => onDateChanged(event, "start")}
            selected={formValues.start}
            dateFormat={"Pp"}
            showTimeSelect
            locale={"es"}
            timeCaption="Hora"
          />
        </div>

        <div className="form-group row mb-2">
          <label className="form-label">Fecha y hora fin</label>
          <DatePicker
            className="form-control"
            onChange={(event) => onDateChanged(event, "end")}
            selected={formValues.end}
            dateFormat={"Pp"}
            minDate={formValues.start}
            showTimeSelect
            locale={"es"}
            timeCaption="Hora"
          />
        </div>

        <hr className="row" />
        <div className="form-group row mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group row mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block  w-100"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
