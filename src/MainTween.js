class MainTween
{
    constructor()
    {
        //protected private
        this.stage    = null;
        this.renderer = null;
        
        try {
            window.devicePixelRatio = window['devicePixelRatio'] || 1;
        } catch(event) { }
        
        const screenWidth  = Math.max(screen.width, screen.height);
        const screenHeight = Math.min(screen.width, screen.height);
        const innerWidth   = Math.max(window.innerWidth, window.innerHeight);
        const innerHeight  = Math.min(window.innerWidth, window.innerHeight);
        const width  = screenWidth  / window.devicePixelRatio >= innerWidth ?
                       screenWidth  / window.devicePixelRatio : screenWidth;
        const height = screenHeight / window.devicePixelRatio >= innerHeight ?
                       screenHeight / window.devicePixelRatio : screenHeight;
        MainTween.scaleView   = DetectDevice.isDesktop() || Math.min(width  * window.devicePixelRatio / 960,
                                                                height * window.devicePixelRatio / 640);
        MainTween.viewWidth   = window.innerWidth  * window.devicePixelRatio / MainTween.scaleView;
        MainTween.viewHeight  = window.innerHeight * window.devicePixelRatio / MainTween.scaleView;
        MainTween.animationId = null;
        MainTween.last        = 0;
        MainTween.delta       = 0;
        
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
        stage.scale.x = MainTween.scaleView;
        stage.scale.y = MainTween.scaleView;
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
            TweenManager.remove, tweenPos, MainTween.viewWidth - 100, 100);
        TweenManager.add(tweenPos);
        
        TweenManager.delayCall(2, console.log, 'delay call');
        
        document.addEventListener('visibilitychange', this.onVisibility.bind(this));
        window.addEventListener('resize', this.onResize.bind(this));
        setTimeout(this.onResize.bind(this), 0);
        
        var delta = 0;
        (this.updateHandler = function update(now)
        {
            MainTween.animationId = requestAnimationFrame(update);
            delta      = now - MainTween.last;
            MainTween.last  = now;
            MainTween.delta = delta * 0.06;
            
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
            cancelAnimationFrame(MainTween.animationId);
        else if (document['visibilityState'] === 'visible')
            this.updateHandler(MainTween.last = performance.now());
    }
    
    /**
     * @private
     */
    onResize()
    {
        MainTween.viewWidth  = window.innerWidth  * window.devicePixelRatio / MainTween.scaleView;
        MainTween.viewHeight = window.innerHeight * window.devicePixelRatio / MainTween.scaleView;
        
        this.renderer.view.style.width  = window.innerWidth  + 'px';
        this.renderer.view.style.height = window.innerHeight + 'px';
        this.renderer.resize(window.innerWidth  * window.devicePixelRatio,
                             window.innerHeight * window.devicePixelRatio);
        this.renderer.render(this.stage);
        window.scrollTo(0, 0);
    }
}

new MainTween();
