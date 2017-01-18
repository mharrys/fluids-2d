var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
    "use strict";

    F2D.Boundary = function(fs, grid) {
        this.grid = grid;

        this.uniforms = {
            read: {
                type: "t"
            },
            gridSize: {
                type: "v2"
            },
            gridOffset: {
                type: "v2"
            },
            scale: {
                type: "f"
            },
        };
        var material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            fragmentShader: fs,
            depthWrite: false,
            depthTest: false,
            blending: THREE.NoBlending
        });

        var createLine = function(positions) {
            var vertices = new Float32Array(positions.length * 3);
            for (var i = 0; i < positions.length; i++) {
                vertices[i * 3    ] = positions[i][0];
                vertices[i * 3 + 1] = positions[i][1];
                vertices[i * 3 + 2] = positions[i][2];
            }

            var geometry = new THREE.BufferGeometry();
            geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

            return new THREE.Line(geometry, material);
        };

        var ax = (this.grid.size.x - 2) / this.grid.size.x;
        var ay = (this.grid.size.y - 2) / this.grid.size.y;
        var bx = (this.grid.size.x - 1) / this.grid.size.x;
        var by = (this.grid.size.y - 1) / this.grid.size.y;

        this.lineL = createLine([[-ax, -ay, 0], [-bx,  by, 0]]);
        this.lineR = createLine([[ ax, -ay, 0], [ bx,  by, 0]]);
        this.lineB = createLine([[-ax, -ay, 0], [ bx, -by, 0]]);
        this.lineT = createLine([[-ax,  ay, 0], [ bx,  by, 0]]);

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        this.scene = new THREE.Scene();

        this.gridOffset = new THREE.Vector3();
    };

    F2D.Boundary.prototype = {
        constructor: F2D.Boundary,

        compute: function(renderer, input, scale, output) {
            if (!this.grid.applyBoundaries)
                return;

            this.uniforms.read.value = input.read;
            this.uniforms.gridSize.value = this.grid.size;
            this.uniforms.scale.value = scale;

            this.renderLine(renderer, this.lineL, [ 1,  0], output);
            this.renderLine(renderer, this.lineR, [-1,  0], output);
            this.renderLine(renderer, this.lineB, [ 0,  1], output);
            this.renderLine(renderer, this.lineT, [ 0, -1], output);
        },

        renderLine: function(renderer, line, offset, output) {
            this.scene.add(line);
            this.gridOffset.set(offset[0], offset[1]);
            this.uniforms.gridOffset.value = this.gridOffset;
            renderer.render(this.scene, this.camera, output.write, false);
            this.scene.remove(line);
            // we do not swap output, the next slab operation will fill in the
            // iterior and swap it
        }
    };

}(F2D));
