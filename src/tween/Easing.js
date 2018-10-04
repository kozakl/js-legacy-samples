Easing.PI_M2 = Math.PI * 2;
Easing.PI_D2 = Math.PI / 2;

function Easing() { }

Easing.linear = function(t, b, c, d)
{
    return c*t/d + b;
};


Easing.sineIn = function(t, b, c, d)
{
    return -c * Math.cos(t/d * Easing.PI_D2) + c + b;
};

Easing.sineOut = function(t, b, c, d)
{
    return c * Math.sin(t/d * Easing.PI_D2) + b;
};

Easing.sineInOut = function(t, b, c, d)
{
    return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};


Easing.quintIn = function(t, b, c, d)
{
    return c*(t/=d)*t*t*t*t + b;
};

Easing.quintOut = function(t, b, c, d)
{
    return c*((t=t/d-1)*t*t*t*t + 1) + b;
};

Easing.quintInOut = function(t, b, c, d)
{
    if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
    return c/2*((t-=2)*t*t*t*t + 2) + b;
};


Easing.quartIn = function(t, b, c, d)
{
    return c*(t/=d)*t*t*t + b;
};

Easing.quartOut = function(t, b, c, d)
{
    return -c * ((t=t/d-1)*t*t*t - 1) + b;
};

Easing.quartInOut = function(t, b, c, d)
{
    if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
    return -c/2 * ((t-=2)*t*t*t - 2) + b;
};


Easing.quadIn = function(t, b, c, d)
{
    return c*(t/=d)*t + b;
};

Easing.quadOut = function(t, b, c, d)
{
    return -c *(t/=d)*(t-2) + b;
};

Easing.quadInOut = function(t, b, c, d)
{
    if ((t/=d/2) < 1) return c/2*t*t + b;
    return -c/2 * ((--t)*(t-2) - 1) + b;
};


Easing.expoIn = function(t, b, c, d)
{
    return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
};

Easing.expoOut = function(t, b, c, d)
{
    return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
};

Easing.expoInOut = function(t, b, c, d)
{
    if (t==0) return b;
    if (t==d) return b+c;
    if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
};


Easing.elasticIn = function(t, b, c, d, a, p)
{
    var s;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (!a || a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/Easing.PI_M2 * Math.asin (c/a);
    return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*Easing.PI_M2/p )) + b;
};

Easing.elasticOut = function(t, b, c, d, a, p)
{
    var s;
    if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
    if (!a || a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/Easing.PI_M2 * Math.asin (c/a);
    return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*Easing.PI_M2/p ) + c + b);
};

Easing.elasticInOut = function(t, b, c, d, a, p)
{
    var s;
    if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
    if (!a || a < Math.abs(c)) { a=c; s=p/4; }
    else s = p/Easing.PI_M2 * Math.asin (c/a);
    if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*Easing.PI_M2/p )) + b;
    return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*Easing.PI_M2/p )*.5 + c + b;
};


Easing.circularIn = function(t, b, c, d)
{
    return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
};

Easing.circularOut = function(t, b, c, d)
{
    return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
};

Easing.circularInOut = function(t, b, c, d)
{
    if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
    return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
};


Easing.backIn = function(t, b, c, d)
{
    var s = 1.70158;
    return c*(t/=d)*t*((s+1)*t - s) + b;
};

Easing.backOut = function(t, b, c, d)
{
    var s = 1.70158;
    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};

Easing.backInOut = function(t, b, c, d)
{
    var s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
};


Easing.bounceIn = function(t, b, c, d)
{
    return c - Easing.bounceOut (d-t, 0, c, d) + b;
};

Easing.bounceOut = function(t, b, c, d)
{
    if ((t/=d) < (1/2.75))
        return c*(7.5625*t*t) + b;
    else if (t < (2/2.75))
        return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
    else if (t < (2.5/2.75))
        return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
    else
        return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
};

Easing.bounceInOut = function(t, b, c, d)
{
    if (t < d/2) return Easing.bounceIn (t*2, 0, c, d) * .5 + b;
    else return Easing.bounceOut (t*2-d, 0, c, d) * .5 + c*.5 + b;
};


Easing.cubicIn = function(t, b, c, d)
{
    return c*(t/=d)*t*t + b;
};

Easing.cubicOut = function(t, b, c, d)
{
    return c*((t=t/d-1)*t*t + 1) + b;
};

Easing.cubicInOut = function(t, b, c, d)
{
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};

window['Easing'] = Easing;
