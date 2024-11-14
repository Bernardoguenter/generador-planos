import jsPDF from "jspdf";

/* function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const convertPDF = (stageRef) => {
  const uri = stageRef.current.toDataURL();
  downloadURI(uri, "stage.jpg");
}; */

export function convertPDF(stageRef, alto, ancho) {
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
  pdf.save(`Plano galpón ${alto}x${ancho}.pdf`);
}
