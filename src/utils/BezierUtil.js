class BezierUtil
{
    static pointOnQuadCurve(x1, y1,
                            cx, cy,
                            x2, y2,
                            t,  result) {
        const ax = cx - x1,      ay = cy - y1;
        const bx = x2 - cx - ax, by = y2 - cy - ay;
        
        result.x = x1 + t * (2*ax + t*bx);
        result.y = y1 + t * (2*ay + t*by);
        return result;
    }
    
    static pointOnCubicCurve(x1,  y1,
                             c1x, c1y,
                             c2x, c2y,
                             x2,  y2,
                             t,   result) {
        const ax = c1x - x1,       ay = c1y - y1;
        const bx = c2x - c1x - ax, by = c2y - c1y - ay;
        const cx = x2  - c2x - ax - bx - bx;
        const cy = y2  - c2y - ay - by - by;
        
        result.x = x1 + t * (3*ax + (t * (3*bx + t*cx)));
        result.y = y1 + t * (3*ay + (t * (3*by + t*cy)));
        return result;
    }
    
    static pointOnCubicCurveX(x1,  c1x,
                              c2x, x2,
                              t) {
        const ax = c1x - x1;
        const bx = c2x - c1x - ax;
        const cx = x2  - c2x - ax - bx - bx;
        
        return x1 + t * (3*ax + (t * (3*bx + t*cx)));
    }
    
    static pointOnCubicCurveY(y1, c1y,
                              c2y, y2,
                              t) {
        const ay = c1y - y1;
        const by = c2y - c1y - ay;
        const cy = y2  - c2y - ay - by - by;
        
        return y1 + t * (3*ay + (t * (3*by + t*cy)));
    }
}
