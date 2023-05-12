// Precisión de los cálculos de punto flotante
precision mediump float;

// Textura de entrada
uniform sampler2D texture;

// Tamaño de píxel
uniform float pixelSize;

// Coordenadas de textura interpoladas desde los vértices
varying vec2 texcoords2;

void main() {
  // Redondear las coordenadas de textura al tamaño de píxel más cercano
  vec2 p = floor(texcoords2 / pixelSize) * pixelSize;
  
  // Obtener el color de la textura en las coordenadas redondeadas
  vec4 texel = texture2D(texture, p);
  
  // Asignar el color del texel como salida
  gl_FragColor = vec4(vec3(texel), 1.0);
}
