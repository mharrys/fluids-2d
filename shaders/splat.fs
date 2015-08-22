uniform sampler2D read;

uniform vec2 gridSize;

uniform vec3 color;
uniform vec2 point;
uniform float radius;

float gauss(vec2 p, float r)
{
    return exp(-dot(p, p) / r);
}

void main()
{
    vec2 uv = gl_FragCoord.xy / gridSize.xy;
    vec3 base = texture2D(read, uv).xyz;
    vec2 coord = point.xy - gl_FragCoord.xy;
    vec3 splat = color * gauss(coord, gridSize.x * radius);
    gl_FragColor = vec4(base + splat, 1.0);
}
