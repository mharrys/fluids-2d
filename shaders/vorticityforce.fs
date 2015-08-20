uniform sampler2D velocity;
uniform sampler2D vorticity;

uniform vec2 gridSize;
uniform float gridScale;

uniform float timestep;
uniform float epsilon;
uniform vec2 curl;

void main()
{
    vec2 uv = gl_FragCoord.xy / gridSize.xy;

    vec2 xOffset = vec2(1.0 / gridSize.x, 0.0);
    vec2 yOffset = vec2(0.0, 1.0 / gridSize.y);

    float vl = texture2D(vorticity, uv - xOffset).x;
    float vr = texture2D(vorticity, uv + xOffset).x;
    float vb = texture2D(vorticity, uv - yOffset).x;
    float vt = texture2D(vorticity, uv + yOffset).x;
    float vc = texture2D(vorticity, uv).x;

    float scale = 0.5 / gridScale;
    vec2 force = scale * vec2(abs(vt) - abs(vb), abs(vr) - abs(vl));
    float lengthSquared = max(epsilon, dot(force, force));
    force *= inversesqrt(lengthSquared) * curl * vc;
    force.y *= -1.0;

    vec2 velc = texture2D(velocity, uv).xy;
    gl_FragColor = vec4(velc + (timestep * force), 0.0, 1.0);
}
