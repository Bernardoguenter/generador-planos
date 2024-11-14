// Calcular la longitud de los lados del triángulo del techo
export const calculoLadoTriangulo = (halfBase, pico) =>
  Math.sqrt(Math.pow(halfBase, 2) + Math.pow(pico, 2));

// Función para calcular el cateto opuesto en un triángulo rectángulo
export function calcularCatetoOpuesto(hipotenusa, angulo) {
  // Convertir el ángulo a radianes
  const anguloRad = angulo * (Math.PI / 180);

  // Calcular el cateto opuesto usando la función seno
  return hipotenusa * Math.sin(anguloRad);
}
