class TweenCubicCurve3D extends TweenCore
{
    constructor(target)
    {
        super();
        //args
        this.target = target;
        //private
        this.pos      = new PIXI.Point();
        this.delay    = null;
        this.progress = null;
        this.curve    = null;
    }
    
    to(duration, delay, ease, progress,
                              complete,
                              completeArg,
                              curve) {
        this.duration = duration;
        this.delay = delay;
        this.ease = ease;
        this.progress = progress;
        this.complete  = complete;
        this.completeArg = completeArg;
        this.curve = curve;
        this.time = 0;
        this.percent = 0;
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
        this.pos = BezierUtil.pointOnCubicCurve(
            curve[0].x, curve[0].y,
            curve[1].x, curve[1].y,
            curve[2].x, curve[2].y,
            curve[3].x, curve[3].y,
            ease, this.pos
        );
        this.pos.z = BezierUtil.pointOnCubicCurveY(
            curve[0].z,
            curve[1].z,
            curve[2].z,
            curve[3].z,
            ease
        );
        this.target.position.x = this.pos.x;
        this.target.position.y = this.pos.y;
        this.target.position.z = this.pos.z;
        
        if (this.progress)
            this.progress(this.percent);
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
