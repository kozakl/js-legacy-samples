/**
 * @author kozakluke@gmail.com
 */
class ArrayUtil
{
    static shuffle(array)
    {
        for (var i = array.length; i--;)
        {
            const j = Math.random() * (i + 1) | 0,
                  t = array[i];
            array[i] = array[j];
            array[j] = t;
        }
        
        return array;
    }
    
    static compare(key, asc)
    {
        return (a, b)=> {
            a = a[key];
            b = b[key];
            if (a > b)
                return 1 * asc;
            if (a < b)
                return-1 * asc;
            return 0;
        };
    }
}
