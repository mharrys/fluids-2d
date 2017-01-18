var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
    "use strict";

    F2D.Gradient = function(fs, grid) {
        this.grid = grid;

        this.uniforms = {
            p: {
                type: "t"
            },
            w: {
                type: "t"
            },
            gridSize: {
                type: "v2"
            },
            gridScale: {
                type: "f"
            },
        };

        F2D.SlabopBase.call(this, fs, this.uniforms, grid);
    };

    F2D.Gradient.prototype = Object.create(F2D.SlabopBase.prototype);
    F2D.Gradient.prototype.constructor = F2D.Gradient;

    F2D.Gradient.prototype.compute = function(renderer, p, w, output) {
        this.uniforms.p.value = p.read;
        this.uniforms.w.value = w.read;
        this.uniforms.gridSize.value = this.grid.size;
        this.uniforms.gridScale.value = this.grid.scale;

        renderer.render(this.scene, this.camera, output.write, false);
        output.swap();
    };

}(F2D));
