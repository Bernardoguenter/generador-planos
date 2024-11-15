import { convertPDF } from "../utils/jsToPdf";

/* eslint-disable react/prop-types */
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
}) => {
  const isValid = () => {
    return (
      alto !== "" &&
      ancho !== "" &&
      pico !== "" &&
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
        default:
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convertir los valores a números
    const numericAlto = parseFloat(alto);
    const numericAncho = parseFloat(ancho);
    const numericPico = parseFloat(pico);
    const numericAnchoColumna = parseFloat(anchoColumna);
    const numericLargoCaja = parseFloat(largoCaja);

    if (
      isNaN(numericAlto) ||
      isNaN(numericAncho) ||
      isNaN(numericPico) ||
      isNaN(numericAnchoColumna) ||
      isNaN(numericLargoCaja)
    ) {
      alert("Por favor ingrese valores numéricos válidos.");
      return;
    }

    setAlto(numericAlto);
    setAncho(numericAncho);
    setPico(numericPico);
    setAnchoColumna(numericAnchoColumna);
    setLargoCaja(numericLargoCaja);

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
