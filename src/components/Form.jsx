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
    return alto !== 0 && alto > 0 && ancho !== 0 && ancho > 0 && pico >= 0;
  };

  const handleDraw = () => {
    if (isValid()) {
      setDraw(true);
    }
  };

  const resetPlano = () => {
    setDraw(false);
    setAlto(initialValues.alto);
    setAncho(initialValues.ancho);
    setPico(initialValues.pico);
    setAnchoColumna(initialValues.anchoColumna);
    setLargoCaja(initialValues.largoCaja);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-2 w-full md:w-1/3 justify-start items-stretch py-8 px-4 h-full">
      <h2 className="text-2xl font-bold text-center mb-8">
        Generador de Plano
      </h2>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Alto (mts):</label>
        <input
          className="w-1/2"
          type="number"
          value={alto}
          onChange={(e) => setAlto(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Ancho (mts):</label>
        <input
          className="w-1/2"
          type="number"
          value={ancho}
          onChange={(e) => setAncho(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Pico (mts):</label>
        <input
          className="w-1/2"
          type="number"
          value={pico}
          onChange={(e) => setPico(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Ancho de Columna (mts):</label>
        <input
          className="w-1/2"
          type="number"
          value={anchoColumna}
          onChange={(e) => setAnchoColumna(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center justify-start w-full">
        <label className="w-1/2">Largo Caja (mts):</label>
        <input
          className="w-1/2"
          type="number"
          value={largoCaja}
          onChange={(e) => setLargoCaja(Number(e.target.value))}
        />
      </div>

      <div className="flex items-center justify-around mt-8">
        <button
          className=" max-w-40 text-center p-2 rounded text-white font-medium disabled:cursor-not-allowed 
            disabled:bg-blue-200 bg-blue-500"
          type="button"
          onClick={handleDraw}
          disabled={!isValid()}>
          Generar Plano
        </button>
        <button
          className="bg-red-500 max-w-40 text-center p-2 rounded text-white font-medium disabled:cursor-not-allowed 
            disabled:bg-red-200"
          type="button"
          onClick={resetPlano}
          disabled={!draw}>
          Borrar Plano
        </button>
      </div>
      <button
        onClick={() => convertPDF(stageRef)}
        disabled={!draw}
        className="w-full bg-orange-500  max-w-full m-auto text-center p-2 rounded text-white font-medium disabled:cursor-not-allowed disabled:bg-orange-200">
        Generar plano en PDF
      </button>
    </form>
  );
};
