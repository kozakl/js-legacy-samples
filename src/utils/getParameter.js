function getParameter(name)
{
    name = name.replace(/[\[\]]/g, '\\$&');
    
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
          result = regex.exec(window.location.href);
    if (!result)
        return null;
    if (!result[2])
        return '';
    return decodeURIComponent(result[2].replace(/\+/g, ' '));
}
