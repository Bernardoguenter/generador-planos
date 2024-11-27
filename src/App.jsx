import { useRef, useState } from "react";
import { Form } from "./components/Form";
import { DrawCanva } from "./components/DrawCanva";

const initialValues = {
  alto: "0",
  ancho: "0",
  pico: "0",
  anchoColumna: "0.3",
  largoCaja: "0.6",
  lineaPico: "0",
  altoPozo: "0",
  cantidadColumnas: "0",
  columnValues: [],
  separacionLineas: "0.22",
};

const App = () => {
  const [alto, setAlto] = useState(initialValues.alto);
  const [ancho, setAncho] = useState(initialValues.ancho);
  const [pico, setPico] = useState(initialValues.pico);
  const [anchoColumna, setAnchoColumna] = useState(initialValues.anchoColumna);
  const [largoCaja, setLargoCaja] = useState(initialValues.largoCaja);
  const [lineaPico, setLineaPico] = useState(initialValues.lineaPico);
  const [draw, setDraw] = useState(false);
  const [altoPozo, setAltoPozo] = useState(initialValues.altoPozo);
  const [separacionLineas, setSeparacionLineas] = useState(
    initialValues.separacionLineas
  );
  const [cantidadColumnas, setCantidadColumnas] = useState(
    initialValues.cantidadColumnas
  );
  const [columnValues, setColumnValues] = useState(initialValues.columnValues);
  const stageRef = useRef(null);

  return (
    <main className="flex flex-col md:flex-row items-start justify-center min-h-screen w-full">
      <Form
        stageRef={stageRef}
        alto={alto}
        setAlto={setAlto}
        ancho={ancho}
        setAncho={setAncho}
        pico={pico}
        setPico={setPico}
        anchoColumna={anchoColumna}
        setAnchoColumna={setAnchoColumna}
        largoCaja={largoCaja}
        setLargoCaja={setLargoCaja}
        draw={draw}
        setDraw={setDraw}
        initialValues={initialValues}
        lineaPico={lineaPico}
        setLineaPico={setLineaPico}
        altoPozo={altoPozo}
        setAltoPozo={setAltoPozo}
        cantidadColumnas={cantidadColumnas}
        setCantidadColumnas={setCantidadColumnas}
        columnValues={columnValues}
        setColumnValues={setColumnValues}
        separacionLineas={separacionLineas}
        setSeparacionLineas={setSeparacionLineas}
      />
      <DrawCanva
        stageRef={stageRef}
        alto={alto}
        ancho={ancho}
        pico={pico}
        anchoColumna={anchoColumna}
        largoCaja={largoCaja}
        draw={draw}
        lineaPico={lineaPico}
        altoPozo={altoPozo}
        separacionLineas={separacionLineas}
        columnValues={columnValues}
      />
    </main>
  );
};

export default App;
