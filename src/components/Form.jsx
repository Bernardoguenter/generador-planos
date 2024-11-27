/* eslint-disable react/prop-types */
import { convertPDF } from "../utils/jsToPdf";

export const Form = ({
  alto,
  setAlto,
  ancho,
  setAncho,
  pico,
  setPico,
  anchoColumna,
  setAnchoColumna,
  largoCaja,
  setLargoCaja,
  setDraw,
  initialValues,
  draw,
  stageRef,
  lineaPico,
  setLineaPico,
  altoPozo,
  setAltoPozo,
  cantidadColumnas,
  setCantidadColumnas,
  columnValues,
  setColumnValues,
  separacionLineas,
  setSeparacionLineas,
}) => {
  const isValid = () => {
    return (
      alto !== "" &&
      ancho !== "" &&
      pico !== "" &&
      altoPozo !== "" &&
      lineaPico !== "" &&
      ancho !== "0" &&
      alto !== "0"
    );
  };

  const resetPlano = () => {
    setDraw(false);
    setAlto(initialValues.alto);
    setAncho(initialValues.ancho);
    setPico(initialValues.pico);
    setAnchoColumna(initialValues.anchoColumna);
    setLargoCaja(initialValues.largoCaja);
    setLineaPico(initialValues.lineaPico);
    setAltoPozo(initialValues.altoPozo);
    setCantidadColumnas(initialValues.cantidadColumnas);
    setColumnValues(initialValues.columnValues);
    setSeparacionLineas(initialValues.separacionLineas);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9.,]*$/.test(value)) {
      const normalizedValue = value.replace(",", ".");

      switch (name) {
        case "alto":
          setAlto(normalizedValue);
          break;
        case "ancho":
          setAncho(normalizedValue);
          break;
        case "pico":
          setPico(normalizedValue);
          break;
        case "anchoColumna":
          setAnchoColumna(normalizedValue);
          break;
        case "largoCaja":
          setLargoCaja(normalizedValue);
          break;
        case "lineaPico":
          setLineaPico(normalizedValue);
          break;
        case "altoPozo":
          setAltoPozo(normalizedValue);
          break;
        case "separacionLineas":
          setSeparacionLineas(normalizedValue);
          break;
        case "cantidadColumnas":
          setCantidadColumnas(normalizedValue);
          setColumnValues(new Array(normalizedValue).fill("")); // Crea un arreglo vacío con la cantidad de columnas
          break;
        default:
          break;
      }
    }
  };

  const handleColumnChange = (index, value) => {
    const newValues = [...columnValues];
    newValues[index] = value;
    setColumnValues(newValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir los valores a números
    const numericAlto = parseFloat(alto);
    const numericAncho = parseFloat(ancho);
    const numericPico = parseFloat(pico);
    const numericAnchoColumna = parseFloat(anchoColumna);
    const numericLargoCaja = parseFloat(largoCaja);
    const numericLineaPico = parseFloat(lineaPico);
    const numericAltoPozo = parseFloat(altoPozo);
    const numericCantidadColumnas = parseFloat(cantidadColumnas);
    const numericSeparacionLineas = parseFloat(separacionLineas);

    if (
      isNaN(numericAlto) ||
      isNaN(numericAncho) ||
      isNaN(numericPico) ||
      isNaN(numericAnchoColumna) ||
      isNaN(numericLargoCaja) ||
      isNaN(numericLineaPico) ||
      isNaN(numericAltoPozo) ||
      isNaN(numericCantidadColumnas) ||
      isNaN(numericSeparacionLineas)
    ) {
      alert("Por favor ingrese valores numéricos válidos.");
      return;
    }

    setAlto(numericAlto);
    setAncho(numericAncho);
    setPico(numericPico);
    setAnchoColumna(numericAnchoColumna);
    setLargoCaja(numericLargoCaja);
    setLineaPico(numericLineaPico);
    setAltoPozo(numericAltoPozo);
    setCantidadColumnas(numericCantidadColumnas);
    setSeparacionLineas(numericSeparacionLineas);
    setDraw(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full md:w-1/4 justify-start items-center py-8 px-8  bg-slate-200 md:min-h-screen ">
      <h2 className="text-2xl font-bold text-center mb-8">
        Generador de Plano
      </h2>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Alto (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={alto}
          onChange={handleChange}
          name="alto"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Ancho (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={ancho}
          onChange={handleChange}
          name="ancho"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Pico (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={pico}
          onChange={handleChange}
          name="pico"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Ancho de Columna (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={anchoColumna}
          onChange={handleChange}
          name="anchoColumna"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Largo Caja (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={largoCaja}
          onChange={handleChange}
          name="largoCaja"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Línea Pico (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={lineaPico}
          onChange={handleChange}
          name="lineaPico"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Alto Pozo (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={altoPozo}
          onChange={handleChange}
          name="altoPozo"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Separación Líneas (mts):</label>
        <input
          className="w-1/2"
          type="text"
          value={separacionLineas}
          onChange={handleChange}
          name="separacionLineas"
          disabled={draw}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Cantidad Columnas:</label>
        <input
          className="w-1/2"
          type="text"
          value={cantidadColumnas}
          onChange={handleChange}
          name="cantidadColumnas"
          disabled={draw}
        />
      </div>
      <div className="w-full flex justify-start items-center flex-wrap">
        {Array.from({ length: cantidadColumnas }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-start w-1/2  ">
            <label className="w-1/2">Col {index + 1}:</label>
            <input
              className="w-1/2"
              type="text"
              value={columnValues[index] || ""}
              onChange={(e) => handleColumnChange(index, e.target.value)}
              disabled={draw}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 items-center justify-around mt-8 w-full">
        <button
          className=" w-full text-center p-2 rounded text-white font-medium disabled:cursor-not-allowed 
            disabled:bg-gray-400 bg-black"
          type="submit"
          disabled={!isValid() || draw}>
          Generar Plano
        </button>
        <button
          className=" w-full text-center p-2 rounded text-white font-medium disabled:cursor-not-allowed 
            disabled:bg-gray-400 bg-black"
          type="button"
          onClick={resetPlano}
          disabled={!draw}>
          Nuevo Plano
        </button>
        <button
          onClick={() => convertPDF(stageRef, alto, ancho)}
          disabled={!draw}
          className="w-full  max-w-full m-auto text-center p-2 rounded text-white font-medium disabled:cursor-not-allowed disabled:bg-blue-200 bg-blue-800">
          Exportar plano a PDF
        </button>
      </div>
    </form>
  );
};
