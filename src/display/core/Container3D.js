/**
 * @extends {Container}
 * @constructor
 */
function Container3D()
{
    PIXI.Container.call(this);
    //public
    this.worldTransform3d = mat4.create();
    this.scale            = new Point3D(1, 1, 1);
    this.rotation         = new Point3D(0, 0, 0);
    this.position         = new Point3D(0, 0, 0);
    //protected private
    this.rotationCache    = new Point3D(Infinity, Infinity, Infinity);
    this.mat4             = mat4.create();
    this.scaleVec         = vec3.create();
    this.rotationQuat     = quat.create();
    this.positionVec      = vec3.create();
}

Container3D.prototype = Object.create(PIXI.Container.prototype);
Container3D.prototype.constructor = Container3D;

/**
 * @protected
 */
Container3D.prototype.updateTransform = function()
{
    if (!this.visible)
        return;
    
    if (this.rotation.x !== this.rotationCache.x) {
        this.rotationCache.x = this.rotation.x;
        this._cx = Math.cos(this.rotation.x * 0.5);
        this._sx = Math.sin(this.rotation.x * 0.5);
    }
    if (this.rotation.y !== this.rotationCache.y) {
        this.rotationCache.y = this.rotation.y;
        this._cy = Math.cos(this.rotation.y * 0.5);
        this._sy = Math.sin(this.rotation.y * 0.5);
    }
    if (this.rotation.z !== this.rotationCache.z) {
        this.rotationCache.z = this.rotation.z;
        this._cz = Math.cos(this.rotation.z * 0.5);
        this._sz = Math.sin(this.rotation.z * 0.5);
    }
    this.scaleVec[0]     = this.scale.x;
    this.scaleVec[1]     = this.scale.y;
    this.scaleVec[2]     = this.scale.z;
    this.rotationQuat[0] = this._sx * this._cy * this._cz + this._cx * this._sy * this._sz;
    this.rotationQuat[1] = this._cx * this._sy * this._cz - this._sx * this._cy * this._sz;
    this.rotationQuat[2] = this._cx * this._cy * this._sz + this._sx * this._sy * this._cz;
    this.rotationQuat[3] = this._cx * this._cy * this._cz - this._sx * this._sy * this._sz;
    this.positionVec[0]  = this.position.x;
    this.positionVec[1]  = this.position.y;
    this.positionVec[2]  = this.position.z;
    
    MatrixUtil.fromRotationTranslationScale(
        this.worldTransform3d,
        this.rotationQuat,
        this.positionVec,
        this.scaleVec
    );
    mat4.multiply(this.worldTransform3d, this.parent.worldTransform3d, this.worldTransform3d);
    
    this.worldAlpha = this.alpha * this.parent.worldAlpha;
    
    const n = this.children.length;
    for (let i = 0; i < n; ++i)
        this.children[i].updateTransform();
};

Container3D.prototype.container3dUpdateTransform = Container3D.prototype.updateTransform;
