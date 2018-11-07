class Tween
{
    constructor()
    {
        //private
        this.stage    = null;
        this.renderer = null;
        
        try {
            window.devicePixelRatio = window['devicePixelRatio'] || 1;
        } catch(event) { }
        
        const screenWidth = Math.max(screen.width, screen.height),
              screenHeight = Math.min(screen.width, screen.height),
              innerWidth = Math.max(window.innerWidth, window.innerHeight),
              innerHeight = Math.min(window.innerWidth, window.innerHeight);
        const width = screenWidth / window.devicePixelRatio >= innerWidth ?
                      screenWidth / window.devicePixelRatio : screenWidth;
        const height = screenHeight / window.devicePixelRatio >= innerHeight ?
                       screenHeight / window.devicePixelRatio : screenHeight;
        Tween.scaleView = DetectDevice.isDesktop() || Math.min(width  * window.devicePixelRatio / 960,
                                                               height * window.devicePixelRatio / 640);
        Tween.viewWidth = window.innerWidth  * window.devicePixelRatio / Tween.scaleView;
        Tween.viewHeight = window.innerHeight * window.devicePixelRatio / Tween.scaleView;
        Tween.animationId = null;
        Tween.last = 0;
        Tween.delta = 0;
        
        window.onload = this.onLoad.bind(this);
    }
    
    /**
     * @private
     */
    onLoad()
    {
        const stats = new Stats();
        document.body.appendChild(stats.domElement);
        stats.domElement.style.position = 'absolute';
        
        const stage = this.stage = new PIXI.Container();
        stage.scale.x = Tween.scaleView;
        stage.scale.y = Tween.scaleView;
        const renderer = this.renderer = PIXI.autoDetectRenderer(0, 0);
        document.body.appendChild(renderer.view);
        renderer.backgroundColor = 0x333333;
        
        const tweenManager = new TweenManager();
        
        const shape = new PIXI.Graphics();
        stage.addChild(shape);
        shape.beginFill(0xFFFF00, 1);
        shape.drawRect(0, 0, 15, 15);
        shape.endFill();
        shape.position.x = 100;
        shape.position.y = 100;
        
        const tweenPos = new TweenPos(shape);
        tweenPos.to(5, 1, Easing.backInOut,
            TweenManager.remove, tweenPos, Tween.viewWidth - 100, 100);
        TweenManager.add(tweenPos);
        
        TweenManager.delayCall(2, console.log, 'delay call');
        
        document.addEventListener('visibilitychange', this.onVisibility.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        setTimeout(this.onResize.bind(this), 0);
        
        var delta = 0;
        (this.updateHandler = function update(now)
        {
            Tween.animationId = requestAnimationFrame(update);
            delta = now - Tween.last;
            Tween.last = now;
            Tween.delta = delta * 0.06;
            
            stats.update();
            tweenManager.update(delta * 0.001);
            renderer.render(stage);
        })(performance.now());
    }
    
    /**
     * @private
     */
    onVisibility()
    {
        if (document['visibilityState'] === 'hidden')
            cancelAnimationFrame(Tween.animationId);
        else if (document['visibilityState'] === 'visible')
            this.updateHandler(Tween.last = performance.now());
    }
    
    /**
     * @private
     */
    onResize()
    {
        Tween.viewWidth = window.innerWidth * window.devicePixelRatio / Tween.scaleView;
        Tween.viewHeight = window.innerHeight * window.devicePixelRatio / Tween.scaleView;
        
        this.renderer.view.style.width = window.innerWidth + 'px';
        this.renderer.view.style.height = window.innerHeight + 'px';
        this.renderer.resize(window.innerWidth * window.devicePixelRatio,
                             window.innerHeight * window.devicePixelRatio);
        this.renderer.render(this.stage);
        window.scrollTo(0, 0);
    }
}

new Tween();
