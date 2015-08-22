uniform sampler2D velocity;

uniform vec2 gridSize;
uniform float gridScale;

void main()
{
    vec2 uv = gl_FragCoord.xy / gridSize.xy;

    vec2 xOffset = vec2(1.0 / gridSize.x, 0.0);
    vec2 yOffset = vec2(0.0, 1.0 / gridSize.y);

    float vl = texture2D(velocity, uv - xOffset).y;
    float vr = texture2D(velocity, uv + xOffset).y;
    float vb = texture2D(velocity, uv - yOffset).x;
    float vt = texture2D(velocity, uv + yOffset).x;

    float scale = 0.5 / gridScale;
    gl_FragColor = vec4(scale * (vr - vl - vt + vb), 0.0, 0.0, 1.0);
}
