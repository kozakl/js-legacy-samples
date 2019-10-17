class TweenFlakeX extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.rotation = new DNumber();
        this.x        = new DNumber();
    }
    
    to(duration, ease, complete,
                       completeArg,
                       rotation,
                       x) {
        this.duration = duration;
        this.ease = ease;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
        
        this.rotation.set(this.target.rotation, rotation);
        this.x.set(this.target.position.x, x);
    }
    
    update(delta)
    {
        this.tweenCoreUpdate(delta);
        
        const ease = this.ease(this.time, 0, 1, this.duration);
        this.target.rotation = this.rotation.begin - (this.rotation.begin - this.rotation.end) * ease;
        this.target.position.x = this.x.begin - (this.x.begin - this.x.end) * ease;
        
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
