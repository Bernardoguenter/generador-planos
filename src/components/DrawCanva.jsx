import { Stage, Layer, Line, Text } from "react-konva";
import { calcularCatetoOpuesto, calculoLadoTriangulo } from "../utils/calculos";
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
export const DrawCanva = ({
  alto,
  ancho,
  pico,
  anchoColumna,
  largoCaja,
  draw,
  stageRef,
}) => {
  const [scaleFactor, setScaleFactor] = useState(0);
  const [xAxis, setXAxis] = useState(150);
  const [yAxis, setYAxis] = useState(300);

  useEffect(() => {
    if (alto >= 10) {
      if (ancho > 30) {
        setScaleFactor(20);
      } else if (ancho >= 28) {
        setScaleFactor(22);
      } else if (ancho >= 25) {
        setScaleFactor(25);
      } else {
        setScaleFactor(28);
      }
      setXAxis(50);
      setYAxis(250);
    } else {
      if (ancho > 25) {
        setScaleFactor(23);
      } else if (ancho <= 25 && ancho > 20) {
        setScaleFactor(28);
      } else if (ancho <= 20 && ancho > 10) {
        setScaleFactor(30);
      } else if (ancho <= 10 && ancho > 5) {
        setScaleFactor(35);
      } else {
        setScaleFactor(100);
      }
      setXAxis(100);
      setYAxis(250);
    }
  }, [scaleFactor, alto, xAxis, yAxis, ancho, pico]);

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
  return (
    <section className="w-full md:w-3/4 flex flex-col items-center justify-start bg-white min-h-screen">
      {draw && (
        <Stage
          width={1000} // Ajusta el tamaño del Stage
          height={800} // Ajusta el tamaño del Stage
          backgroundColor="white"
          ref={stageRef}>
          <Layer>
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
    </section>
  );
};
