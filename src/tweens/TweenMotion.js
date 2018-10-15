class TweenMotion extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.motion = new DNumber();
        this.delay  = null;
    }
    
    to(duration, delay, ease, complete,
                              completeArg,
                              motion) {
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
        
        this.motion.set(this.target.motionSpeed, motion);
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
        this.target.motionSpeed = this.motion.begin - (this.motion.begin - this.motion.end) * ease;
        
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
