class TweenSpeed extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.speed = new DNumber();
        this.delay = null;
    }
    
    to(duration, delay, ease, complete,
                              completeArg,
                              speed) {
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
        
        this.speed.set(this.target.speed, speed);
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
        this.target.speed = this.speed.begin - (this.speed.begin - this.speed.end) * ease;
        
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
