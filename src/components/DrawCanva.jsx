/* eslint-disable react/prop-types */
import { Stage, Layer, Line, Text } from "react-konva";
import { calcularCatetoOpuesto, calculoLadoTriangulo } from "../utils/calculos";
import { useEffect, useState } from "react";

export const DrawCanva = ({
  alto,
  ancho,
  pico,
  anchoColumna,
  largoCaja,
  draw,
  stageRef,
  lineaPico,
  altoPozo,
  separacionLineas,
  columnValues,
}) => {
  const [scaleFactor, setScaleFactor] = useState(30);
  const [xAxis, setXAxis] = useState(150);
  const [yAxis, setYAxis] = useState(300);

  useEffect(() => {
    if (alto >= 10) {
      setXAxis(50);
      setYAxis(250);
    } else {
      setXAxis(100);
      setYAxis(250);
    }
  }, [alto]);

  console.log(scaleFactor);

  // Calcular la longitud de los lados del triángulo del techo
  const halfBase = ancho / 2;
  const ladoTecho = calculoLadoTriangulo(halfBase, pico);

  // Calcular los grados de pendiente del techo interno y externo
  const pendienteTecho = Math.atan2(pico, halfBase) * (180 / Math.PI);

  //Calcular el ángulo formado por la pendiente del techo techo y el largo de la caja
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
  const verticeIzqTechoX = xAxis;
  const verticeIzqTechoY = yAxis;

  // Vértice derecho del techo
  const verticeDerTechoX = xAxis + ancho * scaleFactor;
  const verticeDerTechoY = yAxis;

  // Calcular la distancia horizontal (cateto adyacente)
  const catetoAdyacente = anchoColumna * Math.tan(anguloBaseRad);
  //Calcular hipotenusa del tríangulo
  const hipotenusa = Math.sqrt(
    Math.pow(catetoAdyacente, 2) + Math.pow(anchoColumna, 2)
  );

  //Calcular diferencia entre largoCaja y catetoAdyacente
  const diferencia = largoCaja - hipotenusa;

  // Punto final anchoCajaIzq izquierda
  const finAnchoCajaIzqX = verticeIzqTechoX + desplazamiento_x * scaleFactor;
  const finAnchoCajaIzqY = verticeIzqTechoY + desplazamiento_y * scaleFactor;

  // Punto final de la línea roja derecha
  const finAnchoCajaDerX = verticeDerTechoX - desplazamiento_x * scaleFactor;
  const finAnchoCajaDerY = verticeDerTechoY + desplazamiento_y * scaleFactor;

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
    finAnchoCajaIzqY +
    (limiteInternoIzqX - finAnchoCajaIzqX) * pendientePerpendicularIzq;
  const interseccionDerY =
    finAnchoCajaDerY +
    (limiteInternoDerX - finAnchoCajaDerX) * pendientePerpendicularDer;

  // Calcular la longitud de la nueva línea perpendicular
  const longitudNuevaLínea = Math.sqrt(
    Math.pow(limiteInternoIzqX - finAnchoCajaIzqX, 2) +
      Math.pow(interseccionIzqY - finAnchoCajaIzqY, 2)
  );

  // Calcular el ángulo entre el punto final de la largo caja y el techo interno
  const deltaX = limiteInternoIzqX - finAnchoCajaIzqX;
  const deltaY = interseccionIzqY - finAnchoCajaIzqY;
  const lineaLargoCajaHaciaTecho = Math.atan2(deltaY, deltaX);

  // Calcular desplazamientos en X e Y para la nueva línea rosa, manteniendo la misma longitud que la línea púrpura
  const desplazamientoXRosa =
    longitudNuevaLínea * Math.cos(lineaLargoCajaHaciaTecho);
  const desplazamientoYRosa =
    longitudNuevaLínea * Math.sin(lineaLargoCajaHaciaTecho);

  // **Invertimos los desplazamientos para que la línea izquierda vaya hacia arriba y el interior**
  const puntoFinPerpendicularIzqX = finAnchoCajaIzqX - desplazamientoXRosa;
  const puntoFinPerpendicularIzqY = finAnchoCajaIzqY - desplazamientoYRosa;

  // **Invertimos los desplazamientos para que la línea derecha vaya hacia arriba y el interior**
  const puntoFinPerpendicularDerX = finAnchoCajaDerX + desplazamientoXRosa;
  const puntoFinPerpendicularDerY = finAnchoCajaDerY - desplazamientoYRosa;

  //Calcular el largo de la línea que uno el techo interno con el la lado interno.
  const largoTotalLineaPerpendicular = longitudNuevaLínea * 2;

  // Calcular el alto interno entre los puntos de la esquina superior e inferior izquierda
  const altoInterno = Math.abs(alto - catetoAdyacente);

  // Calcular la longitud entre el Punto izquierdo interno y el Pico interno central
  const ladoTechoInterno = Math.sqrt(
    Math.pow(xAxis + ancho / 2 - (xAxis + anchoColumna), 2) +
      Math.pow(yAxis - (pico - anchoColumna) - (yAxis + catetoAdyacente), 2)
  );

  //Calcular la diferencia de largo entre los dos techos
  const diferenciaLargoCaja = largoCaja - diferencia;
  const angulo = 90 - anguloMedioTecho; // Ángulo en grados
  const diferenciaEntreTechos = calcularCatetoOpuesto(
    diferenciaLargoCaja,
    angulo
  );

  /** ESTO ES PARA CALCULAR EL PUNTO MEDIO DEL TECHO **/
  //Calcular punto medio del vértice del techo al pico
  // Pico del techo
  const xPico = xAxis + (ancho * scaleFactor) / 2;
  const yPico = yAxis - pico * scaleFactor;

  // Punto medio entre el lado izquierdo y el pico
  const puntoMedioIzqX = (verticeIzqTechoX + xPico) / 2;
  const puntoMedioIzqY = (verticeIzqTechoY + yPico) / 2;

  //Ahora no necesito el lado derecho pero ya lo dejamos calculado.
  /*   // Punto medio entre el lado derecho y el pico
  const puntoMedioDerX = (verticeDerTechoX + xPico) / 2;
  const puntoMedioDerY = (verticeDerTechoY + yPico) / 2;
 */

  /** ESTO ES PARA CALCULAR EL PUNTO MEDIO DEL TECHO o LÍNEA DE PICO **/

  // Puntos para dibujar el triángulo del pico entero
  const baseTrianguloX = xAxis + (ancho * scaleFactor) / 2; // Centro en X (pico)
  const baseTrianguloY = yAxis - (pico - anchoColumna) * scaleFactor; // Base del triángulo en la línea del techo
  const alturaTriangulo = (lineaPico - anchoColumna) * scaleFactor; // Cateto opuesto
  const anguloTriangulo = pendienteTecho * (Math.PI / 180); // Ángulo en radianes

  // Calcular el cateto adyacente a partir del cateto opuesto y el ángulo
  const baseAdyacente = alturaTriangulo / Math.tan(anguloTriangulo);

  // Coordenadas del vértice derecho
  const verticeDerechoX = baseTrianguloX + baseAdyacente;
  const verticeDerechoY = baseTrianguloY + alturaTriangulo;

  // Coordenadas del vértice izquierdo
  const verticeIzquierdoX = baseTrianguloX - baseAdyacente;
  const verticeIzquierdoY = verticeDerechoY;

  // Puntos para dibujar el triángulo del pico con separación
  const baseTrianguloX1 = xAxis + (ancho * scaleFactor) / 2; // Centro en X (pico)
  const baseTrianguloY1 = yAxis - (pico - anchoColumna) * scaleFactor; // Base del triángulo en la línea del techo
  const alturaTriangulo1 =
    (lineaPico - anchoColumna - separacionLineas) * scaleFactor; // Cateto opuesto
  const anguloTriangulo1 = pendienteTecho * (Math.PI / 180); // Ángulo en radianes

  // Calcular el cateto adyacente a partir del cateto opuesto y el ángulo
  const baseAdyacente1 = alturaTriangulo1 / Math.tan(anguloTriangulo1);

  // Coordenadas del vértice derecho
  const verticeDerechoX1 = baseTrianguloX1 + baseAdyacente1;
  const verticeDerechoY1 = baseTrianguloY1 + alturaTriangulo1;

  // Coordenadas del vértice izquierdo
  const verticeIzquierdoX1 = baseTrianguloX1 - baseAdyacente1;
  const verticeIzquierdoY1 = verticeDerechoY1;

  /* CÁLCULO DE COLUMNAS */
  //Agregar separación entre columnas
  const newColumnValues = columnValues.map((columna) => {
    const newCols = parseFloat(columna) + 0.22;
    return newCols;
  });

  //Obtener todos los valores de las líneas de columnas
  const finalColsValues = columnValues
    .concat(newColumnValues)
    .sort((a, b) => a - b);

  const calcularPuntoTecho = (columna) => {
    // Coordenadas de los puntos del techo interno (límites naranja)
    const xIzquierdoTecho = xAxis + anchoColumna * scaleFactor;
    const yIzquierdoTecho = yAxis + catetoAdyacente * scaleFactor;

    const xDerechoTecho =
      xAxis - anchoColumna * scaleFactor + ancho * scaleFactor;
    const yDerechoTecho = yAxis + catetoAdyacente * scaleFactor;

    // Coordenadas de los puntos de la línea basePico
    const xIzquierdoBasePico = verticeIzquierdoX;
    const yIzquierdoBasePico = verticeIzquierdoY;

    const xDerechoBasePico = verticeDerechoX;
    const yDerechoBasePico = verticeDerechoY;

    // Coordenada X de la columna
    const xColumna = xAxis + columna * scaleFactor;

    // Determinar el rango en el que está la columna
    let xInicio, yInicio, xFin, yFin;

    if (xColumna <= xIzquierdoBasePico) {
      // Lado izquierdo (basePico izquierda)
      xInicio = xIzquierdoBasePico;
      yInicio = yIzquierdoBasePico;
      xFin = xIzquierdoTecho;
      yFin = yIzquierdoTecho;
    } else if (xColumna >= xDerechoBasePico) {
      // Lado derecho (basePico derecha)
      xInicio = xDerechoBasePico;
      yInicio = yDerechoBasePico;
      xFin = xDerechoTecho;
      yFin = yDerechoTecho;
    } else if (xColumna > xIzquierdoTecho && xColumna < xDerechoTecho) {
      // Dentro del techo interno (entre los dos techos)
      xInicio = xIzquierdoTecho;
      yInicio = yIzquierdoTecho;
      xFin = xDerechoTecho;
      yFin = yDerechoTecho;
    } else {
      // Si la columna no entra en ningún rango válido, devolvemos null
      console.error("Columna fuera de rango válido:", xColumna);
      return null;
    }

    // Calcular pendiente (m) y desplazamiento (b)
    const m = (yFin - yInicio) / (xFin - xInicio);
    const b = yInicio - m * xInicio;

    // Calcular el punto en el techo interno
    const yTecho = m * xColumna + b;

    return { xColumna, yTecho };
  };
  const puntosColumna = (columna) => {
    const techo = calcularPuntoTecho(columna);

    // Coordenada X de la columna
    const xColumna = xAxis + columna * scaleFactor;

    let yBasePico, alturaColumna;

    // Caso 1: Columna dentro del rango basePico
    if (xColumna >= verticeIzquierdoX && xColumna <= verticeDerechoX1) {
      // Calculamos la altura directamente en la basePico
      const mPico =
        (verticeDerechoY - verticeIzquierdoY) /
        (verticeDerechoX - verticeIzquierdoX);
      const bPico = verticeIzquierdoY - mPico * verticeIzquierdoX;

      yBasePico = mPico * xColumna + bPico;

      // Altura de la columna (diferencia entre el punto superior y la base)
      alturaColumna = (yAxis + alto * scaleFactor - yBasePico) / scaleFactor;

      return {
        puntos: [
          xColumna,
          yBasePico, // Punto superior (basePico)
          xColumna,
          yAxis + alto * scaleFactor, // Punto inferior (base)
        ],
        alturaColumna,
      };
    }

    // Caso 2: Columna fuera del rango basePico (usar cálculo de techo interno)
    if (techo) {
      const { xColumna, yTecho } = techo;

      // Altura de la columna (diferencia entre el punto superior y la base)
      alturaColumna = (yAxis + alto * scaleFactor - yTecho) / scaleFactor;

      return {
        puntos: [
          xColumna,
          yTecho, // Punto superior (techo interno)
          xColumna,
          yAxis + alto * scaleFactor, // Punto inferior (base)
        ],
        alturaColumna,
      };
    }

    // Caso 3: Columna sin techo válido (fallo en el cálculo)
    alturaColumna = (pico - lineaPico) / scaleFactor;

    return {
      puntos: [
        xAxis + columna * scaleFactor,
        yAxis - (pico - lineaPico) * scaleFactor, // Punto superior (borde superior)
        xAxis + columna * scaleFactor,
        yAxis + alto * scaleFactor, // Punto inferior (base)
      ],
      alturaColumna,
    };
  };

  return (
    <section className="w-full md:w-3/4 flex flex-col items-center justify-start bg-white min-h-screen">
      {draw && (
        <Stage
          width={1000}
          height={560}
          backgroundColor="white"
          style={{ border: "1px solid black" }}
          ref={stageRef}>
          <Layer>
            {/* Columnas */}
            {finalColsValues.map((columna, index) => {
              const { puntos, alturaColumna } = puntosColumna(columna);

              return (
                <>
                  <Line
                    key={`line-${index}`}
                    points={puntos}
                    stroke="black"
                    strokeWidth={1}
                  />
                  {index % 2 === 0 ? (
                    <Text
                      key={`text-${index}`}
                      text={`${alturaColumna.toFixed(3)}m`}
                      rotation={90}
                      x={xAxis + columna * scaleFactor}
                      y={yAxis + alto / scaleFactor + 50}
                      fontSize={12}
                      fill="black"
                    />
                  ) : (
                    <Text
                      key={`text-${index}`}
                      text={`${alturaColumna.toFixed(3)}m`}
                      rotation={90}
                      x={xAxis + columna * scaleFactor + 10}
                      y={yAxis + alto / scaleFactor + 50}
                      fontSize={12}
                      fill="black"
                    />
                  )}
                </>
              );
            })}

            {/* Base Línea Pico Inferior */}
            <Line
              points={[
                verticeIzquierdoX,
                verticeIzquierdoY, // Vértice izquierdo
                verticeDerechoX,
                verticeDerechoY, // Vértice derecho
              ]}
              stroke="black"
              strokeWidth={1}
              closed={true}
            />
            <Text
              text={`${((2 * baseAdyacente1) / scaleFactor).toFixed(2)}m`}
              x={baseTrianguloX - 35}
              y={baseTrianguloY + separacionLineas * scaleFactor + 10}
              fontSize={12}
              fill="black"
            />
            {/* Base Línea Pico Superior*/}
            <Line
              points={[
                verticeIzquierdoX1,
                verticeIzquierdoY1, // Vértice izquierdo
                verticeDerechoX1,
                verticeDerechoY1, // Vértice derecho
              ]}
              stroke="black"
              strokeWidth={1}
            />
            <Text
              text={`${((2 * baseAdyacente) / scaleFactor).toFixed(2)}m`}
              x={baseTrianguloX - 35}
              y={baseTrianguloY + separacionLineas * scaleFactor + 35}
              fontSize={12}
              fill="black"
            />
            {/* Línea Pico */}
            <Line
              points={[
                xAxis + (ancho * scaleFactor) / 2,
                yAxis - pico * scaleFactor, // Pico interno central
                xAxis + (ancho * scaleFactor) / 2,
                yAxis - (pico - lineaPico) * scaleFactor, // Pico interno central
              ]}
              stroke="black"
              strokeWidth={1}
            />
            <Text
              text={`${lineaPico.toFixed(2)}m`}
              x={xAxis + (ancho * scaleFactor) / 2}
              y={yAxis - pico * scaleFactor + anchoColumna * scaleFactor + 10}
              fontSize={12}
            />
            {/* Alto Pozo */}
            <Line
              points={[
                xAxis,
                yAxis + (alto - altoPozo) * scaleFactor, // Esquina inferior izquierda
                xAxis + ancho * scaleFactor,
                yAxis + (alto - altoPozo) * scaleFactor, // Esquina inferior derecha
              ]}
              strokeWidth={1}
              stroke={"black"}
            />
            <Text
              text={`${altoPozo.toFixed(2)}m`}
              x={xAxis - scaleFactor}
              y={yAxis + (alto - altoPozo) * scaleFactor}
            />
            {/* Líneas perpendiculares Largo Caja (Entre estructura interana y techo interno) */}
            <Line
              points={[
                limiteInternoIzqX,
                interseccionIzqY,
                puntoFinPerpendicularIzqX,
                puntoFinPerpendicularIzqY,
              ]}
              strokeWidth={1}
              stroke={"black"}
            />
            <Line
              points={[
                limiteInternoDerX,
                interseccionDerY,
                puntoFinPerpendicularDerX,
                puntoFinPerpendicularDerY,
              ]}
              strokeWidth={1}
              stroke={"black"}
            />
            {/* Líneas Largo Caja */}
            <Line
              points={[
                verticeIzqTechoX,
                verticeIzqTechoY, // Vértice izquierdo del techo
                verticeIzqTechoX + desplazamiento_x * scaleFactor,
                verticeIzqTechoY + desplazamiento_y * scaleFactor, // Punto final para la línea izquierda
              ]}
              strokeWidth={1}
              stroke={"black"}
            />
            <Line
              points={[
                verticeDerTechoX,
                verticeDerTechoY, // Vértice derecho del techo
                verticeDerTechoX - desplazamiento_x * scaleFactor,
                verticeDerTechoY + desplazamiento_y * scaleFactor, // Punto final para la línea derecha
              ]}
              strokeWidth={1}
              stroke={"black"}
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
              stroke={"black"}
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
              stroke="black"
              strokeWidth={1}
            />
            {/* Base de la estructura (rectángulo externo)*/}
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
              stroke={"black"}
            />
            {/* Estructura interna */}
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
              stroke={"black"}
            />
            {/* Textos */}
            <Text
              text={`Galpón de ${ancho} x ${alto} m`}
              x={0 + innerWidth / 5}
              y={0 + scaleFactor}
              fontSize={16}
              fontStyle="bold"
            />
            <Text
              text={`${altoInterno.toFixed(2)}m`}
              rotation={90}
              x={xAxis + anchoColumna * scaleFactor * 2.5}
              y={yAxis + (altoInterno / 2) * scaleFactor}
            />
            <Text
              text={`Diferencia entre largo de techos:${
                Math.floor(diferenciaEntreTechos * 100) / 100
              }m`}
              x={xAxis}
              y={yAxis + alto * scaleFactor + 20}
            />
            <Text
              text={`${alto.toFixed(2)}m`}
              rotation={90}
              x={xAxis - anchoColumna * scaleFactor}
              y={yAxis + (alto / 2) * scaleFactor}
            />
            <Text
              text={`${anchoColumna.toFixed(2)}`}
              rotation={90}
              x={xAxis + ancho * scaleFactor}
              y={yAxis + alto * scaleFactor - 30}
              fontSize={9}
            />
            <Text
              text={`${pico.toFixed(2)}m`}
              x={xAxis + (ancho * scaleFactor) / 2 - 15}
              y={yAxis - pico * scaleFactor - 15}
            />
            <Text
              text={`${anguloBase.toFixed(2)}°`}
              x={xAxis - anchoColumna * scaleFactor * 5}
              y={yAxis - anchoColumna * scaleFactor}
            />
            <Text
              text={`${ladoTecho.toFixed(2)}m`}
              x={puntoMedioIzqX}
              y={puntoMedioIzqY - anchoColumna * scaleFactor - 10}
              rotation={-pendienteTecho}
            />
            <Text
              text={`${ladoTechoInterno.toFixed(2)}m`}
              x={puntoMedioIzqX}
              y={puntoMedioIzqY + anchoColumna * scaleFactor + 10}
              rotation={-pendienteTecho}
            />
            <Text
              text={`${largoCaja.toFixed(2)}m`}
              x={verticeDerTechoX}
              y={verticeDerTechoY - anchoColumna * scaleFactor}
            />
            <Text
              text={`${largoTotalLineaPerpendicular.toFixed(2)}cm`}
              fontSize={10}
              rotation={anguloMedioTecho}
              x={puntoFinPerpendicularDerX - 20}
              y={puntoFinPerpendicularDerY - 0}
            />
          </Layer>
        </Stage>
      )}
      <input
        type="range"
        value={scaleFactor}
        onChange={(e) => setScaleFactor(e.target.valueAsNumber)}
      />
    </section>
  );
};
