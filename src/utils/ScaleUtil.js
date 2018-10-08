class ScaleUtil
{
    static scale(target,  mode,
                 targetW, targetH,
                 destW,   destH,
                 minZoom, maxZoom) {
        if (mode === ScaleUtil.EXACT_FIT) {
            target.scale.x = destW / targetW;
            target.scale.y = destH / targetH;
        }
        else if (mode === ScaleUtil.SHOW_ALL)
        {
            var scale = destW / targetW > destH / targetH ?
                        destH / targetH :
                        destW / targetW;
            if (scale < minZoom)
                scale = minZoom;
            else if (scale > maxZoom)
                scale = maxZoom;    
            
            target.scale.x = target.scale.y = scale;
        }
        else if (mode === ScaleUtil.NO_BORDER)
        {
            scale = destW / targetW < destH / targetH ?
                    destH / targetH :
                    destW / targetW;
            if (scale < minZoom)
                scale = minZoom;
            else if (scale > maxZoom)
                scale = maxZoom;
            
            target.scale.x = target.scale.y = scale;
        }
    }
}

ScaleUtil.EXACT_FIT = 1;
ScaleUtil.SHOW_ALL = 2;
ScaleUtil.NO_BORDER = 3;
