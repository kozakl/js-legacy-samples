class FullScreen
{
    static isSupported()
    {
        return !!(document.documentElement.requestFullscreen       ||
                  document.documentElement.webkitRequestFullscreen ||
                  document.documentElement.mozRequestFullScreen    ||
                  document.documentElement.msRequestFullscreen);
    }
    
    static isFullScreen()
    {
        return !!(document.fullscreenElement       ||
                  document.webkitFullscreenElement ||
                  document.mozFullScreenElement    ||
                  document.msFullscreenElement);
    }
    
    static request()
    {
        if (document.documentElement.requestFullscreen)
            document.documentElement.requestFullscreen();
        else if (document.documentElement.webkitRequestFullscreen)
            document.documentElement.webkitRequestFullscreen();
        else if (document.documentElement.mozRequestFullScreen)
            document.documentElement.mozRequestFullScreen();
        else if (document.documentElement.msRequestFullscreen)
            document.documentElement.msRequestFullscreen();
    }
    
    static exit()
    {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.webkitExitFullscreen)
            document.webkitExitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
    }
}

FullScreen.CHANGE = document.documentElement.requestFullscreen       && 'fullscreenchange'       ||
                    document.documentElement.webkitRequestFullscreen && 'webkitfullscreenchange' ||
                    document.documentElement.mozRequestFullScreen    && 'mozfullscreenchange'    ||
                    document.documentElement.msRequestFullscreen     && 'MSFullscreenChange';
