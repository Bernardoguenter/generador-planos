import jsPDF from "jspdf";

export function convertPDF(stageRef) {
  // Generar la imagen del canvas de Konva como PNG
  const dataURL = stageRef.current.toDataURL({ pixelRatio: 2 }); // Ajusta pixelRatio para mayor calidad

  // Crear un nuevo documento PDF en orientación landscape
  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [800, 600], // Ajusta el tamaño de acuerdo al canvas
  });

  // Agregar la imagen PNG al PDF
  pdf.addImage(dataURL, "PNG", 10, 10, 780, 580); // Ajusta tamaño y posición de la imagen en el PDF

  // Guardar el PDF
  pdf.save("Plano.pdf");
}
