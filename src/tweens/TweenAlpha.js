class TweenAlpha extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.alpha  = new DNumber();
        this.delay  = null;
    }
    
    to(duration, delay, complete,
                        completeArg,
                        alpha) {
        this.duration    = duration;
        this.delay       = delay;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.time        = 0;
        this.percent     = 0;
        
        this.alpha.set(this.target.alpha, alpha);
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
        
        this.target.alpha = this.alpha.begin - (this.alpha.begin - this.alpha.end) * this.percent;
        
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
