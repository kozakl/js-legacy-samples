class TweenManager
{
    static add(tween)
    {
        if (TweenManager.tweens.indexOf(tween) === -1)
            TweenManager.tweens.push(tween);
    }
    
    static remove(tween)
    {
        const i = TweenManager.tweens.indexOf(tween);
        if (i !== -1)
            TweenManager.tweens[i] = null;
    }
    
    static setMotionSpeed(value)
    {
        const n = TweenManager.tweens.length;
        for (var i = 0; i < n; ++i)
            if (TweenManager.tweens[i])
                TweenManager.tweens[i].motionSpeed = value;
    }
    
    static delayCall(duration, complete,
                               completeArg) {
        const delay = TweenManager.delaysPool.pop() || new Delay();
        delay.to(duration,
            function(delay) {
                TweenManager.remove(delay);
                TweenManager.delaysPool.push(delay);
                complete(completeArg);
            }, delay);
        TweenManager.add(delay);
        
        return delay;
    }
    
    static stopDelay(delay)
    {
        TweenManager.remove(delay);
        if (TweenManager.delaysPool.indexOf(delay) === -1)
            TweenManager.delaysPool.push(delay);
    }
    
    update(delta)
    {
        var n = TweenManager.tweens.length,
            c = 0;
        if (n === 0)
            return;
        for (var i = 0; i < n; ++i)
        {
            const tween = TweenManager.tweens[i];
            if (tween)
            {
                if (c !== i) {
                    TweenManager.tweens[c] = tween;
                    TweenManager.tweens[i] = null;
                }
                tween.update(delta);
                ++c;
            }
        }
        
        if (c !== i)
        {
            n = TweenManager.tweens.length;
            while (i < n)
                TweenManager.tweens[c++] = TweenManager.tweens[i++];
            
            TweenManager.tweens.length = c;
        }
    }
}

TweenManager.delaysPool = [];
TweenManager.tweens = [];

class Delay extends TweenCore
{
    constructor()
    {
        super();
        //protected private
        this.delay = null;
    }
    
    to(duration, complete,
                 completeArg) {
        this.duration = duration;
        this.complete = complete;
        this.completeArg = completeArg;
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
            this.time = 0;
            this.delay = null;
        }
        this.tweenCoreUpdate(delta);
        
        if (this.percent >= 1)
        {
            var tComplete = this.complete;
            this.complete = null;
            if (tComplete)
            {
                if (this.completeArg)
                    tComplete(this.completeArg);
                else
                    tComplete();
                tComplete = null;
            }
        }
    }
}
