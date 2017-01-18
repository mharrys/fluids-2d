var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
    "use strict";

    F2D.Advect = function(fs, grid, time, dissipation) {
        this.grid = grid;
        this.time = time;
        this.dissipation = dissipation === undefined ? 0.998 : dissipation;

        this.uniforms = {
            velocity: {
                type: "t"
            },
            advected: {
                type: "t"
            },
            gridSize: {
                type: "v2"
            },
            gridScale: {
                type: "f"
            },
            timestep: {
                type: "f"
            },
            dissipation: {
                type: "f"
            }
        };

        F2D.SlabopBase.call(this, fs, this.uniforms, grid);
    };

    F2D.Advect.prototype = Object.create(F2D.SlabopBase.prototype);
    F2D.Advect.prototype.constructor = F2D.Advect;

    F2D.Advect.prototype.compute = function(renderer, velocity, advected, output) {
        this.uniforms.velocity.value = velocity.read;
        this.uniforms.advected.value = advected.read;
        this.uniforms.gridSize.value = this.grid.size;
        this.uniforms.gridScale.value = this.grid.scale;
        this.uniforms.timestep.value = this.time.step;
        this.uniforms.dissipation.value = this.dissipation;

        renderer.render(this.scene, this.camera, output.write, false);
        output.swap();
    };

}(F2D));
