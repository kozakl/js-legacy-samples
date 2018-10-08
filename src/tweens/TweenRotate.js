class TweenRotate extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //pprivate
        this.rotate = new DNumber();
    }
    
    to(duration, ease, complete,
                       completeArg,
                       rotate) {
        this.duration    = duration;
        this.ease        = ease;
        this.complete    = complete;
        this.completeArg = completeArg;
        this.time        = 0;
        this.percent     = 0;
        
        this.rotate.set(this.target.rotation, rotate);
    }
    
    update(delta)
    {
        this.tweenCoreUpdate(delta);
        
        const ease = this.ease(this.time, 0, 1, this.duration);
        this.target.rotation = this.rotate.begin - (this.rotate.begin - this.rotate.end) * ease;
        
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
