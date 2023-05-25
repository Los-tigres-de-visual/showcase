// heavily influence by some discussions with Sebastian Chaparro
// https://github.com/sechaparroc
precision mediump float;

// palette is sent by the sketch and comprises the video
uniform sampler2D palette;
// target horizontal & vertical resolution
uniform float resolution;
// uv visualization
uniform bool uv;

// texture space normalized interpolated texture coordinates
// should have same name and type as in vertex shader
varying vec2 texcoords2; // (defined in [0..1] ∈ R)

void main() {
  // i. define symbolCoord as a texcoords2
  // remapping in [0.0, resolution] ∈ R
  vec2 symbolCoord = texcoords2 * resolution;
  // ii. define stepCoord as a symbolCoord
  // remapping in [0.0, resolution] ∈ Z
  vec2 stepCoord = floor(symbolCoord);
  // iii. remap symbolCoord to [0.0, 1.0] ∈ R
  symbolCoord = symbolCoord - stepCoord;
  // display uv or sample palette using symbolCoord
  gl_FragColor = uv ? vec4(symbolCoord.st, 0.0, 1.0)
                    : texture2D(palette, symbolCoord);
}