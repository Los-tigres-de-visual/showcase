precision highp float;
uniform vec2 tileSize;
uniform sampler2D sourceImage;
void main() {
  vec2 tileCoords = floor(gl_FragCoord.xy / tileSize) * tileSize;
  vec4 tileColor = texture2D(sourceImage, tileCoords / vec2(uWidth, uHeight));
  gl_FragColor = tileColor;
}