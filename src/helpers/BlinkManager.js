/**
 * @constructor
 */
function BlinkManager() { }

BlinkManager.init = function(scene)
{
    BlinkManager.scene = scene;
    BlinkManager.blind = new Sprite3D(TextureUtil.fromFrame('blind'));
    BlinkManager.tween = new TweenAlpha(BlinkManager.blind);
};

BlinkManager.blink = function(complete)
{
    var blind = BlinkManager.blind;
    BlinkManager.scene.addChild(blind);
    blind.alpha = 1;
    blind.anchor.x = 0.5;
    blind.anchor.y = 0.5;
    blind.width  = Content.viewWidth  + 400;
    blind.height = Content.viewHeight + 400;
    blind.rotation.x = World.ROTATE_X;
    
    BlinkManager.tween.to(0.75, null,
        function() {
            TweenManager.remove(BlinkManager.tween);
            BlinkManager.scene.removeChild(blind);
            complete();
        }, null, 0);
    TweenManager.add(BlinkManager.tween);
};

BlinkManager.scene = null;
BlinkManager.blind = null;
BlinkManager.tween = null;
