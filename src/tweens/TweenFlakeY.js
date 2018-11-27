class TweenFlakeY extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.y = new DNumber();
    }
    
    to(duration, complete,
                 completeArg,
                 y) {
        this.duration = duration;
        this.complete = complete;
        this.completeArg = completeArg;
        this.time = 0;
        this.percent = 0;
        
        this.y.set(this.target.position.y, y);
    }
    
    update(delta)
    {
        this.tweenCoreUpdate(delta);
        
        this.target.position.y = this.y.begin - (this.y.begin - this.y.end) * this.percent;
        
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
