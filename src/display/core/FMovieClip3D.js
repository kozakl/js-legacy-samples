/**
 * @extends {Sprite3D}
 * @constructor
 */
function FMovieClip3D(textures)
{
    Sprite3D.call(this, textures[0]);
    //args
    this.textures    = textures;
    //public
    this.motionSpeed = 1;
    this.loop        = true;
    this.complete    = null;
    //protected private
    this.playing     = false;
    this.time        = 0;
}

FMovieClip3D.prototype = Object.create(Sprite3D.prototype);
FMovieClip3D.prototype.constructor = FMovieClip3D;

Object.defineProperties(FMovieClip3D.prototype, {
    currentFrame: {
        get: function() {
            return (this.time | 0) % this.textures.length;
        }
    }
});

FMovieClip3D.prototype.play = function()
{
    this.playing = true;
};

FMovieClip3D.prototype.gotoAndPlay = function(frame)
{
    this.time    = frame;
    this.playing = true;
};

FMovieClip3D.prototype.gotoAndStop = function(frame)
{
    this.time    = frame;
    this.playing = false;
    
    this._texture = this.textures[this.time];
};

/**
 * @protected
 */
FMovieClip3D.prototype.updateTransform = function()
{
    this.time += this.motionSpeed * Main.delta;
    
    if (this.playing)
    {
        const time = this.time | 0,
              n    = this.textures.length;
        if (this.loop || time < n)
            this._texture = this.textures[time % n];
        else if (time >= n) {
            let complete = this.complete;
            this.complete = null;
            if (complete)
                complete();
            complete = null;
        }
    }
    this.sprite3dUpdateTransform();
};

FMovieClip3D.prototype.movieClip3DUpdateTransform = FMovieClip3D.prototype.updateTransform;
