class DetectDevice
{
    /**
     * @private
     */
    static detect()
    {
        if (DetectDevice.device)
            return DetectDevice.device;
        
        let n = DetectDevice.tablets.length;
        for (let i = 0; i < n; i++)
            
            if (navigator.userAgent.match(DetectDevice.tablets[i]))
                return DetectDevice.device = 'tablet';
        
        n = DetectDevice.smartphones.length;
        for (let i = 0; i < n; i++)
            if (navigator.userAgent.match(DetectDevice.smartphones[i]))
                return DetectDevice.device = 'smartphone';
        
        DetectDevice.ie = navigator.userAgent.indexOf('MSIE') !=-1 ||
                          navigator.appVersion.indexOf('Trident/') > 0;
        return DetectDevice.device = 'desktop';
    }
    
    static isDesktop()
    {
        return Number(DetectDevice.detect() == 'desktop');  
    }
    
    static isMobile()
    {
        return Number(DetectDevice.detect() != 'desktop');
    }
    
    static isIE()
    {
        if (DetectDevice.ie == null)
            DetectDevice.detect();
        return DetectDevice.ie;
    }
}

DetectDevice.smartphones = [
    /Mobile/i,
    /Android/i,
    /iPhone/i,
    /BlackBerry/i,
    /Windows Phone/i,
    /Windows Mobile/i,
    /Maemo/i,
    /PalmSource/i,
    /SymbianOS/i,
    /SymbOS/i,
    /Nokia/i,
    /MOT-/i,
    /JDME/i,
    /Series 60/i,
    /S60/i,
    /SonyEricsson/i
];
DetectDevice.tablets = [
    /Android 3/i,
    /iPad/i
];
DetectDevice.device = null;
DetectDevice.ie     = null;
