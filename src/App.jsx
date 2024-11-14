import { useRef, useState } from "react";
import { Form } from "./components/Form";
import { DrawCanva } from "./components/DrawCanva";

const initialValues = {
  alto: 0,
  ancho: 0,
  pico: 0,
  anchoColumna: 0.3,
  largoCaja: 0.6,
};

const App = () => {
  const [alto, setAlto] = useState(initialValues.alto);
  const [ancho, setAncho] = useState(initialValues.ancho);
  const [pico, setPico] = useState(initialValues.pico);
  const [anchoColumna, setAnchoColumna] = useState(initialValues.anchoColumna);
  const [largoCaja, setLargoCaja] = useState(initialValues.largoCaja);
  const [draw, setDraw] = useState(false);

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
      />
      <DrawCanva
        stageRef={stageRef}
        alto={alto}
        ancho={ancho}
        pico={pico}
        anchoColumna={anchoColumna}
        largoCaja={largoCaja}
        draw={draw}
      />
    </main>
  );
};

export default App;
