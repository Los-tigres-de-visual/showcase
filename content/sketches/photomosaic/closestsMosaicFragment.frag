precision highp float;
uniform vec2 tileSize;
uniform int numMosaics;
uniform sampler2D tileColors;
uniform sampler2D mosaicImages;
void main() {
  vec2 tileCoords = floor(gl_FragCoord.xy / tileSize) * tileSize;
  vec4 tileColor = texture2D(tileColors, tileCoords / vec2(uWidth, uHeight));
  
  float closestDistance = 10000.0; // Valor arbitrario inicialmente grande
  int closestIndex = 0;
  
  for (int i = 0; i < numMosaics; i++) {
    vec4 mosaicColor = texture2D(mosaicImages, vec2(float(i) / float(numMosaics), 0.5));
    float distance = distance(tileColor.rgb, mosaicColor.rgb);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  }
  
  gl_FragColor = vec4(float(closestIndex) / float(numMosaics), 0.5, 0.0, 1.0);
}