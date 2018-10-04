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
    this.time += this.motionSpeed * MainTween.delta;
    
    if (this.playing)
    {
        const time = this.time | 0,
              n    = this.textures.length;
        if (this.loop || time < n)
            this._texture = this.textures[time % n];
        else if (time >= n) {
            var complete = this.complete;
            this.complete = null;
            if (complete)
                complete();
            complete = null;
        }
    }
    this.sprite3dUpdateTransform();
};

FMovieClip.prototype.movieClip3DUpdateTransform = FMovieClip.prototype.updateTransform;
