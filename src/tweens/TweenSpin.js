class TweenSpin extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.rotZ = new DNumber();
    }
    
    to(duration, ease, complete,
                       completeArg,
                       rotZ) {
        this.duration = duration;
        this.ease = ease;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
        
        this.rotZ.set(this.target.rotation.z, rotZ);
    }
    
    update(delta)
    {
        this.tweenCoreUpdate(delta);
        
        const ease = this.ease(this.time, 0, 1, this.duration);
        this.target.rotation.z = this.rotZ.begin - (this.rotZ.begin - this.rotZ.end) * ease;
        
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
