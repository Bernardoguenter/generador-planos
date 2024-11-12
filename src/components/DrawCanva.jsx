import { Stage, Layer, Line, Text } from "react-konva";

/* eslint-disable react/prop-types */
export const DrawCanva = ({
  alto,
  ancho,
  pico,
  anchoColumna,
  largoCaja,
  draw,
}) => {
  const scaleFactor = 40;
  const xAxis = 100;
  const yAxis = 200;

  // Calcular la longitud de los lados del triángulo superior
  const halfBase = ancho / 2;
  const ladoTecho = Math.sqrt(Math.pow(halfBase, 2) + Math.pow(pico, 2));

  // Calcular los grados de pendiente del techo interno y externo
  const pendienteTecho = Math.atan2(pico, halfBase) * (180 / Math.PI);

  //Calcular el ángulo formado por la pendiente del techo techo y el alto de la caja
  const anguloTecho = 90 + pendienteTecho;

  // Calcular el ángulo medio del ángulo del techo
  const anguloMedioTecho = anguloTecho / 2;

  // Calcular el ángulo entre la base del techo y el ángulo medio
  const anguloBase = anguloTecho - anguloMedioTecho - pendienteTecho;
  const anguloBaseRad = anguloBase * (Math.PI / 180);

  // Calcular los desplazamientos en x y y usando largoCaja
  const desplazamiento_x = largoCaja * Math.cos(anguloBaseRad);
  const desplazamiento_y = largoCaja * Math.sin(anguloBaseRad);

  // Vértice izquierdo del techo
  const puntoIzqX = xAxis;
  const puntoIzqY = yAxis;

  // Vértice derecho del techo
  const puntoDerX = xAxis + ancho * scaleFactor;
  const puntoDerY = yAxis;

  // Calcular la distancia horizontal (cateto adyacente)
  const catetoAdyacente = anchoColumna * Math.tan(anguloBaseRad);

  // Calcular la distancia vertical (cateto opuesto)
  const catetoOpuesto = anchoColumna;

  //Calcular hipotenusa del tríangulo
  const hipotenusa = Math.sqrt(
    Math.pow(catetoOpuesto, 2) + Math.pow(catetoOpuesto, 2)
  );

  //Calcular diferencia entre largoCaja y catetoAdyacente
  const diferencia = largoCaja - hipotenusa;

  // Punto final de la línea roja izquierda
  const finLineaRojaIzqX = puntoIzqX + desplazamiento_x * scaleFactor;
  const finLineaRojaIzqY = puntoIzqY + desplazamiento_y * scaleFactor;

  // Punto final de la línea roja derecha
  const finLineaRojaDerX = puntoDerX - desplazamiento_x * scaleFactor;
  const finLineaRojaDerY = puntoDerY + desplazamiento_y * scaleFactor;

  // Calcular pendiente de la línea roja izquierda y derecha
  const pendienteIzq = desplazamiento_y / desplazamiento_x;
  const pendienteDer = -desplazamiento_y / desplazamiento_x; // Para la línea derecha es el mismo valor pero opuesto

  // Calcular pendiente perpendicular
  const pendientePerpendicularIzq = -1 / pendienteIzq;
  const pendientePerpendicularDer = -1 / pendienteDer;

  // Limites de la estructura interna en X
  const limiteInternoIzqX = xAxis + anchoColumna * scaleFactor;
  const limiteInternoDerX = xAxis + (ancho - anchoColumna) * scaleFactor;

  // Calcular la intersección para la nueva línea
  // Intersección en el límite interno izquierdo
  const interseccionIzqY =
    finLineaRojaIzqY +
    (limiteInternoIzqX - finLineaRojaIzqX) * pendientePerpendicularIzq;
  const interseccionDerY =
    finLineaRojaDerY +
    (limiteInternoDerX - finLineaRojaDerX) * pendientePerpendicularDer;

  // Calcular la longitud de la nueva línea perpendicular
  const longitudNuevaLínea = Math.sqrt(
    Math.pow(limiteInternoIzqX - finLineaRojaIzqX, 2) +
      Math.pow(interseccionIzqY - finLineaRojaIzqY, 2)
  );

  // Punto inicial de la línea rosa (final de la línea roja izquierda)
  const puntoInicioRosaX = finLineaRojaIzqX;
  const puntoInicioRosaY = finLineaRojaIzqY;

  // Coordenadas del punto de intersección con el techo interno
  const limiteInternoX = limiteInternoIzqX;
  const limiteInternoY = interseccionIzqY;

  // Calcular el ángulo entre el punto final de la línea roja y el techo interno
  const deltaX = limiteInternoX - puntoInicioRosaX;
  const deltaY = limiteInternoY - puntoInicioRosaY;
  const anguloHaciaTecho = Math.atan2(deltaY, deltaX);

  // Calcular desplazamientos en X e Y para la nueva línea rosa, manteniendo la misma longitud que la línea púrpura
  const desplazamientoXRosa = longitudNuevaLínea * Math.cos(anguloHaciaTecho);
  const desplazamientoYRosa = longitudNuevaLínea * Math.sin(anguloHaciaTecho);

  // **Invertimos los desplazamientos para que la línea izquierda vaya hacia arriba y el interior**
  const puntoFinRosaX = puntoInicioRosaX - desplazamientoXRosa;
  const puntoFinRosaY = puntoInicioRosaY - desplazamientoYRosa;

  // **Invertimos los desplazamientos para que la línea derecha vaya hacia arriba y el interior**
  const puntoFinRosaXDer = finLineaRojaDerX + desplazamientoXRosa;
  const puntoFinRosaYDer = finLineaRojaDerY - desplazamientoYRosa;

  const largoTotalLineaPerpendicular = longitudNuevaLínea * 2;

  /* ESTO ES LO NUEVO A PARTIR DE AHORA */
  // Calcular el alto interno entre los puntos de la esquina superior e inferior izquierda
  const altoInterno = Math.abs(alto - catetoAdyacente);

  // Calcular la longitud entre el Punto izquierdo interno y el Pico interno central
  const ladoTechoInterno = Math.sqrt(
    Math.pow(xAxis + ancho / 2 - (xAxis + anchoColumna), 2) +
      Math.pow(yAxis - (pico - anchoColumna) - (yAxis + catetoAdyacente), 2)
  );

  // Calcular el ángulo para completar los 90° desde del techo externo
  const anguloComplementarioTecho = 90 - anguloBase - pendienteTecho;

  // Diferencia de longitud que le falta a latoTechoInterno para alcanzar ladoTecho cuando el ángulo es 0°

  // Proyección horizontal de latoTechoInterno considerando la inclinación
  const proyeccionHorizontalInterna =
    ladoTechoInterno * Math.cos(anguloBaseRad);

  // Calcular la diferencia de longitud necesaria para igualar a ladoTecho
  const diferenciaLongitud = ladoTecho - proyeccionHorizontalInterna;

  // Inclinación del techo interno en radianes
  const inclinacionTechoInternoRad = Math.atan2(
    pico - anchoColumna,
    ancho / 2 - anchoColumna
  );

  // Distancia horizontal desde el vértice del techo interno hasta la intersección con la línea bordó
  const distanciaHorizontalABordo =
    ladoTechoInterno * Math.cos(inclinacionTechoInternoRad);

  console.log({
    ladoTecho,
    pendienteTecho,
    anguloTecho,
    anguloMedioTecho,
    anguloBase,
    diferencia,
    altoInterno,
    ladoTechoInterno,
    largoTotalLineaPerpendicular,
    anguloComplementarioTecho,
    proyeccionHorizontalInterna,
    diferenciaLongitud,
    distanciaHorizontalABordo,
  });

  return (
    <section className="w-full md:w-2/3 flex flex-col items-center justify-start bg-white border-l border-gray-500 min-h-screen">
      {draw && (
        <Stage
          width={800}
          height={600}
          backgroundColor="white"
          id="plano-pdf">
          <Layer>
            <Text
              text={`Diferencia entre largo de techos:${distanciaHorizontalABordo.toFixed(
                2
              )}`}
              x={xAxis / 2}
              y={yAxis / 2}
            />
            <Line
              points={[
                puntoInicioRosaX,
                puntoInicioRosaY, // Inicio en el final de la línea roja
                puntoFinRosaX,
                puntoFinRosaY, // Punto final en dirección al techo interno
              ]}
              strokeWidth={1}
              stroke={"purple"} // Color de la línea rosa
            />
            <Line
              points={[
                finLineaRojaDerX,
                finLineaRojaDerY, // Inicio en el final de la línea roja
                puntoFinRosaXDer,
                puntoFinRosaYDer, // Punto final en dirección al techo interno
              ]}
              strokeWidth={1}
              stroke={"purple"} // Color de la línea rosa
            />
            <Line
              points={[
                finLineaRojaIzqX,
                finLineaRojaIzqY,
                limiteInternoIzqX,
                interseccionIzqY,
              ]}
              strokeWidth={1}
              stroke={"purple"} // Color de la línea perpendicular
            />
            <Line
              points={[
                finLineaRojaDerX,
                finLineaRojaDerY,
                limiteInternoDerX,
                interseccionDerY,
              ]}
              strokeWidth={1}
              stroke={"purple"} // Color de la línea perpendicular
            />

            {/* Líneas ángulo medio */}
            <Line
              points={[
                puntoIzqX,
                puntoIzqY, // Vértice izquierdo del techo
                puntoIzqX + desplazamiento_x * scaleFactor,
                puntoIzqY + desplazamiento_y * scaleFactor, // Punto final para la línea izquierda
              ]}
              strokeWidth={1}
              stroke={"red"} // Color de la línea
            />
            <Line
              points={[
                puntoDerX,
                puntoDerY, // Vértice derecho del techo
                puntoDerX - desplazamiento_x * scaleFactor,
                puntoDerY + desplazamiento_y * scaleFactor, // Punto final para la línea derecha
              ]}
              strokeWidth={1}
              stroke={"red"} // Color de la línea
            />
            <Text
              text={`${largoCaja.toFixed(2)}`}
              x={puntoDerX}
              y={puntoDerY - anchoColumna * scaleFactor}
            />
            <Text
              text={`${largoTotalLineaPerpendicular.toFixed(2)}`}
              rotation={anguloMedioTecho}
              x={puntoDerX - desplazamiento_x * scaleFactor - 10}
              y={puntoDerY + desplazamiento_y * scaleFactor - 10}
            />

            {/* Techo externo */}
            <Line
              points={[
                xAxis,
                yAxis, // Punto izquierdo del techo
                xAxis + (ancho * scaleFactor) / 2,
                yAxis - pico * scaleFactor, // Pico central
                xAxis + ancho * scaleFactor,
                yAxis, // Punto derecho del techo
              ]}
              strokeWidth={1}
              stroke={"green"}
            />
            <Text
              text={`${pico.toFixed(2)}`}
              x={xAxis + (ancho * scaleFactor) / 2}
              y={yAxis - pico * scaleFactor - 10}
            />
            <Text
              text={`${anguloBase.toFixed(2)}°`}
              x={xAxis}
              y={yAxis - anchoColumna * scaleFactor}
            />
            <Text
              text={`${ladoTecho.toFixed(2)}`}
              rotation={-inclinacionTechoInternoRad * (180 / Math.PI)}
              x={xAxis + anchoColumna * 5 * scaleFactor}
              y={yAxis - 40}
            />
            {/* Techo interno */}
            <Text
              text={`${ladoTechoInterno.toFixed(2)}`}
              rotation={-inclinacionTechoInternoRad * (180 / Math.PI)}
              x={xAxis + anchoColumna * 4 * scaleFactor}
              y={yAxis}
            />
            <Line
              points={[
                xAxis + anchoColumna * scaleFactor,
                yAxis + catetoAdyacente * scaleFactor, // Punto izquierdo interno
                xAxis + (ancho * scaleFactor) / 2,
                yAxis - (pico - anchoColumna) * scaleFactor, // Pico interno central
                xAxis + (ancho - anchoColumna) * scaleFactor,
                yAxis + catetoAdyacente * scaleFactor, // Punto derecho interno
              ]}
              stroke="#000000"
              strokeWidth={1}
            />

            {/* Base de la estructura (rectángulo externo)*/}
            <Text
              text={alto.toFixed(2)}
              rotation={90}
              x={xAxis}
              y={yAxis + (alto / 2) * scaleFactor}
            />
            <Text
              text={`${anchoColumna.toFixed(2)}`}
              rotation={90}
              x={xAxis + ancho * scaleFactor}
              y={yAxis + alto * scaleFactor - 30}
            />
            <Line
              points={[
                xAxis,
                yAxis, // Esquina superior izquierda
                xAxis,
                yAxis + alto * scaleFactor, // Esquina inferior izquierda
                xAxis + ancho * scaleFactor,
                yAxis + alto * scaleFactor, // Esquina inferior derecha
                xAxis + ancho * scaleFactor,
                yAxis, // Esquina superior derecha
              ]}
              strokeWidth={1}
              stroke={"blue"}
            />
            {/* Estructura interna */}
            <Text
              text={altoInterno.toFixed(2)}
              rotation={90}
              x={xAxis + anchoColumna * scaleFactor}
              y={yAxis + (altoInterno / 2) * scaleFactor}
            />
            <Line
              points={[
                xAxis + anchoColumna * scaleFactor,
                yAxis + catetoAdyacente * scaleFactor, // Esquina superior izquierda
                xAxis + anchoColumna * scaleFactor,
                yAxis + alto * scaleFactor, // Esquina inferior izquierda
                xAxis - anchoColumna * scaleFactor + ancho * scaleFactor,
                yAxis + alto * scaleFactor, // Esquina inferior derecha
                xAxis - anchoColumna * scaleFactor + ancho * scaleFactor,
                yAxis + catetoAdyacente * scaleFactor, // Esquina superior derecha
              ]}
              strokeWidth={1}
              stroke={"orange"}
            />
          </Layer>
        </Stage>
      )}
    </section>
  );
};
