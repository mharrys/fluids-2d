uniform sampler2D read;

uniform float bias;
uniform float scale;

varying vec2 texCoord;

void main()
{
    gl_FragColor = vec4(bias + scale * texture2D(read, texCoord).xyz, 1.0);
}
