/**
 * @constructor
 */
function Blink() { }

Blink.init = function(scene)
{
    Blink.scene = scene;
    Blink.blind = new Sprite3D(TextureUtil.fromFrame('blind'));
    Blink.tween = new TweenAlpha(Blink.blind);
};

Blink.blink = function(complete)
{
    var blind = Blink.blind;
    Blink.scene.addChild(blind);
    blind.alpha = 1;
    blind.anchor.x = 0.5;
    blind.anchor.y = 0.5;
    blind.width  = Content.viewWidth  + 400;
    blind.height = Content.viewHeight + 400;
    blind.rotation.x = World.ROTATE_X;
    
    Blink.tween.to(0.75, null,
        function() {
            TweenManager.remove(Blink.tween);
            Blink.scene.removeChild(blind);
            complete();
        }, null, 0);
    TweenManager.add(Blink.tween);
};

Blink.scene = null;
Blink.blind = null;
Blink.tween = null;
