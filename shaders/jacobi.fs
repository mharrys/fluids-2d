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

    float xl = texture2D(x, uv - xOffset).x;
    float xr = texture2D(x, uv + xOffset).x;
    float xb = texture2D(x, uv - yOffset).x;
    float xt = texture2D(x, uv + yOffset).x;

    float bc = texture2D(b, uv).x;

    gl_FragColor = vec4((xl + xr + xb + xt + alpha * bc) / beta, 0.0, 0.0, 1.0);
}
