varying vec2 texCoord;

void main()
{
    texCoord = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
