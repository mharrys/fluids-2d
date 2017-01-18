var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
    "use strict";

    F2D.Divergence = function(fs, grid) {
        this.grid = grid;

        this.uniforms = {
            velocity: {
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

    F2D.Divergence.prototype = Object.create(F2D.SlabopBase.prototype);
    F2D.Divergence.prototype.constructor = F2D.Divergence;

    F2D.Divergence.prototype.compute = function(renderer, velocity, divergence) {
        this.uniforms.velocity.value = velocity.read;
        this.uniforms.gridSize.value = this.grid.size;
        this.uniforms.gridScale.value = this.grid.scale;

        renderer.render(this.scene, this.camera, divergence.write, false);
        divergence.swap();
    };

}(F2D));
