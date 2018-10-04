class TweenScale extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //protected private
        this.scaleX = new DNumber();
        this.scaleY = new DNumber();
        this.delay  = null;
    }
    
    to(duration, delay, ease, complete,
                              completeArg,
                              scaleX, scaleY) {
        this.duration    = duration;
        this.delay       = delay;
        this.ease        = ease;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.time        = 0;
        this.percent     = 0;
        
        this.scaleX.set(this.target.scale.x, scaleX);
        this.scaleY.set(this.target.scale.y, scaleY);
    }
    
    update(delta)
    {
        if (this.delay)
        {
            this.time += delta * this.motionSpeed;
            if (this.time < this.delay)
                return;
            this.time  = 0;
            this.delay = null;
        }
        this.tweenCoreUpdate(delta);
        
        const ease = this.ease(this.time, 0, 1, this.duration);
        this.target.scale.x = this.scaleX.begin - (this.scaleX.begin - this.scaleX.end) * ease;
        this.target.scale.y = this.scaleY.begin - (this.scaleY.begin - this.scaleY.end) * ease;
        
        if (this.percent >= 1)
        {
            var complete = this.complete;
            this.complete = null;
            if (complete)
            {
                if (this.completeArg)
                    complete(this.completeArg);
                else
                    complete();
                complete = null;
            }
        }
    }
}
