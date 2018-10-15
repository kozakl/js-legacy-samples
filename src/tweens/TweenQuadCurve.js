class TweenQuadCurve extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.scaleX   = new DNumber();
        this.scaleY   = new DNumber();
        this.pos      = new PIXI.Point();
        this.delay    = null;
        this.progress = null;
        this.curve    = null;
    }
    
    to(duration, delay, ease, progress,
                              complete,
                              completeArg,
                              scaleX, scaleY,
                              curve) {
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        this.progress = progress;
        this.complete = complete;
        this.completeArg = completeArg;
        this.curve = curve;
        this.time = 0;
        this.percent = 0;
        
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
        
        const curve = this.curve,
              ease = this.ease(this.time, 0, 1, this.duration);
        this.pos = BezierUtil.pointOnQuadCurve(curve[0].x, curve[0].y,
                                               curve[1].x, curve[1].y,
                                               curve[2].x, curve[2].y,
                                               ease, this.pos);
        this.target.scale.x = this.scaleX.begin - (this.scaleX.begin - this.scaleX.end) * ease;
        this.target.scale.y = this.scaleY.begin - (this.scaleY.begin - this.scaleY.end) * ease;
        this.target.position.x = this.pos.x;
        this.target.position.y = this.pos.y;
        
        if (this.progress)
            this.progress(this.percent);
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
