class TweenCore
{
    constructor()
    {
        //public
        this.motionSpeed = 1;
        //private
        this.time        = 0;
        this.percent     = 0;
        this.duration    = null;
        this.ease        = null;
        this.complete    = null;
        this.completeArg = null;
    }
    
    update(delta)
    {
        this.time += delta * this.motionSpeed;
        this.percent = this.time / this.duration;
        if (this.percent > 1) {
            this.time = this.duration;
            this.percent = 1;
        }
    }
    
    destroy()
    {
        this.target = null;
        this.complete = null;
        this.completeArg = null;
    }
}

TweenCore.prototype.tweenCoreUpdate = TweenCore.prototype.update;
