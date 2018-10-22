class TweenAlphaScale extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.alpha = new DNumber();
        this.scale = new DNumber();
        this.delay = null;
    }
    
    to(duration, delay, ease, complete,
                              completeArg,
                              alpha,
                              scale) {
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
        
        this.alpha.set(this.target.alpha, alpha);
        this.scale.set(this.target.scale.x, scale);
    }
    
    update(delta)
    {
        if (this.delay)
        {
            this.time += delta * this.motionSpeed;
            if (this.time < this.delay)
                return;
            this.time = 0;
            this.delay = null;
        }
        this.tweenCoreUpdate(delta);
        
        const ease = this.ease(this.time, 0, 1, this.duration);
        this.target.alpha = this.alpha.begin - (this.alpha.begin - this.alpha.end) * ease;
        this.target.scale.x =
        this.target.scale.y = this.scale.begin - (this.scale.begin - this.scale.end) * ease;
        
        if (this.percent >= 1)
        {
            let complete = this.complete;
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
