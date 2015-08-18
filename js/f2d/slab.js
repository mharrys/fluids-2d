var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
    "use strict";

    F2D.Slab = function(width, height, options) {
        this.read = new THREE.WebGLRenderTarget(width, height, options);
        this.write = this.read.clone();
    };

    F2D.Slab.prototype = {
        constructor: F2D.Slab,

        swap: function() {
            var tmp = this.read;
            this.read = this.write;
            this.write = tmp;
        }
    };

    var options = {
        wrapS: THREE.ClampToEdgeWrapping,
        wrapT: THREE.ClampToEdgeWrapping,
        magFilter: THREE.NearestFilter,
        minFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        depthBuffer: false,
        stencilBuffer: false,
        generateMipmaps: false,
        shareDepthFrom: null
    };

    F2D.Slab.make = function(width, height) {
        return new F2D.Slab(width, height, options);
    };

}(F2D));
