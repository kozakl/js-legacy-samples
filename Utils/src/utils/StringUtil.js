/**
 * @author kozakluke@gmail.com
 */
export default class StringUtil
{
    static isFilled(string)
    {
        return /\S/.test(string);
    }
    
    static firstToLower(string)
    {
        return string.substr(0, 1).toLowerCase() + string.substr(1);
    }
    
    static firstToUpper(string)
    {
        return string.substr(0, 1).toUpperCase() + string.substr(1);
    }
    
    static isValidEmail(string)
    {
        return /\S+@\S+\.\S+/.test(string);
    }
    
    static formatNumber1(n)
    {
        if (n < 10)
            return '0' + n;
        return n;
    }
    
    static formatNumber2(n)
    {
        if (n < 10)
            return '00' + n;
        else if (n < 100)
            return '0' + n;
        return n;
    }
}
