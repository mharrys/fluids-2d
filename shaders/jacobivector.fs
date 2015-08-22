uniform sampler2D x;
uniform sampler2D b;

uniform vec2 gridSize;

uniform float alpha;
uniform float beta;

void main()
{
    vec2 uv = gl_FragCoord.xy / gridSize.xy;

    vec2 xOffset = vec2(1.0 / gridSize.x, 0.0);
    vec2 yOffset = vec2(0.0, 1.0 / gridSize.y);

    vec2 xl = texture2D(x, uv - xOffset).xy;
    vec2 xr = texture2D(x, uv + xOffset).xy;
    vec2 xb = texture2D(x, uv - yOffset).xy;
    vec2 xt = texture2D(x, uv + yOffset).xy;

    vec2 bc = texture2D(b, uv).xy;

    gl_FragColor = vec4((xl + xr + xb + xt + alpha * bc) / beta, 0.0, 1.0);
}
