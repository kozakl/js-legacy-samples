/**
 * @class
 * @extends Sprite3D
 * @param textures {Texture[]} an array of {Texture} objects that make up the animation
 */
function MovieClip3D(textures)
{
    Sprite3D.call(this, textures[0]);

    /**
     * @private
     */
    this._textures = textures;

    /**
     * The speed that the MovieClip3D will play at. Higher is faster, lower is slower
     *
     * @member {number}
     * @default 1
     */
    this.animationSpeed = 1;

    /**
     * Whether or not the movie clip repeats after playing.
     *
     * @member {boolean}
     * @default true
     */
    this.loop = true;

    /**
     * Function to call when a MovieClip3D finishes playing
     *
     * @method
     * @memberof MovieClip3D#
     */
    this.onComplete = null;

    /**
     * Elapsed time since animation has been started, used internally to display current texture
     *
     * @member {number}
     * @private
     */
    this._currentTime = 0;

    /**
     * Indicates if the MovieClip3D is currently playing
     *
     * @member {boolean}
     * @readonly
     */
    this.playing = false;
}

// constructor
MovieClip3D.prototype = Object.create(Sprite3D.prototype);
MovieClip3D.prototype.constructor = MovieClip3D;

Object.defineProperties(MovieClip3D.prototype, {
    /**
     * totalFrames is the total number of frames in the MovieClip3D. This is the same as number of textures
     * assigned to the MovieClip3D.
     *
     * @member {number}
     * @memberof PIXI.MovieClip3D#
     * @default 0
     * @readonly
     */
    totalFrames: {
        get: function()
        {
            return this._textures.length;
        }
    },

    /**
     * The array of textures used for this MovieClip3D
     *
     * @member {PIXI.Texture[]}
     * @memberof PIXI.MovieClip3D#
     *
     */
    textures: {
        get: function ()
        {
            return this._textures;
        },
        set: function (value)
        {
            this._textures = value;

            this.texture = this._textures[Math.floor(this._currentTime) % this._textures.length];
        }
    },

    /**
    * The MovieClips current frame index
    *
    * @member {number}
    * @memberof PIXI.MovieClip3D#
    * @readonly
    */
    currentFrame: {
        get: function ()
        {
            return Math.floor(this._currentTime) % this._textures.length;
        }
    }

});

/**
 * Stops the MovieClip3D
 *
 */
MovieClip3D.prototype.stop = function ()
{
    if(!this.playing)
    {
        return;
    }

    this.playing = false;
    PIXI.ticker.shared.remove(this.update, this);
};

/**
 * Plays the MovieClip3D
 *
 */
MovieClip3D.prototype.play = function ()
{
    if(this.playing)
    {
        return;
    }

    this.playing = true;
    PIXI.ticker.shared.add(this.update, this);
};

/**
 * Stops the MovieClip3D and goes to a specific frame
 *
 * @param frameNumber {number} frame index to stop at
 */
MovieClip3D.prototype.gotoAndStop = function (frameNumber)
{
    this.stop();

    this._currentTime = frameNumber;

    var round = Math.floor(this._currentTime);
    this._texture = this._textures[round % this._textures.length];
};

/**
 * Goes to a specific frame and begins playing the MovieClip3D
 *
 * @param frameNumber {number} frame index to start at
 */
MovieClip3D.prototype.gotoAndPlay = function (frameNumber)
{
    this._currentTime = frameNumber;
    this.play();
};

/*
 * Updates the object transform for rendering
 * @private
 */
MovieClip3D.prototype.update = function (deltaTime)
{

    this._currentTime += this.animationSpeed * deltaTime;

    var floor = Math.floor(this._currentTime);

    if (floor < 0)
    {
        if (this.loop)
        {
            this._texture = this._textures[this._textures.length - 1 + floor % this._textures.length];
        }
        else
        {
            this.gotoAndStop(0);

            if (this.onComplete)
            {
                this.onComplete();
            }
        }
    }
    else if (this.loop || floor < this._textures.length)
    {
        this._texture = this._textures[floor % this._textures.length];
    }
    else if (floor >= this._textures.length)
    {
        this.gotoAndStop(this.textures.length - 1);

        if (this.onComplete)
        {
            this.onComplete();
        }
    }
};

/*
 * Stops the MovieClip3D and destroys it
 *
 */
MovieClip3D.prototype.destroy = function ( )
{
    this.stop();
    Sprite3D.prototype.destroy.call(this);
};

/**
 * A short hand way of creating a movieclip3D from an array of frame ids
 *
 * @static
 * @param frames {string[]} the array of frames ids the movieclip3D will use as its texture frames
 */
MovieClip3D.fromFrames = function (frames)
{
    var textures = [];

    for (var i = 0; i < frames.length; ++i)
    {
        textures.push(new core.Texture.fromFrame(frames[i]));
    }

    return new MovieClip3D(textures);
};

/**
 * A short hand way of creating a movieclip3D from an array of image ids
 *
 * @static
 * @param images {string[]} the array of image urls the movieclip3D will use as its texture frames
 */
MovieClip3D.fromImages = function (images)
{
    var textures = [];

    for (var i = 0; i < images.length; ++i)
    {
        textures.push(new core.Texture.fromImage(images[i]));
    }

    return new MovieClip3D(textures);
};
