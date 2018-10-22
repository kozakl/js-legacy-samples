class TweenPosXZ extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.x     = new DNumber();
        this.z     = new DNumber();
        this.delay = null;
    }
    
    to(duration, delay, ease, complete,
                              completeArg,
                              x, z) {
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
        
        this.x.set(this.target.position.x, x);
        this.z.set(this.target.position.z, z);
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
        this.target.position.x = this.x.begin - (this.x.begin - this.x.end) * ease;
        this.target.position.z = this.z.begin - (this.z.begin - this.z.end) * ease;
        
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
