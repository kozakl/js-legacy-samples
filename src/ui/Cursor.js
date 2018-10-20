class Cursor
{
    static init(element)
    {
        this.element = element;
    }
    
    static set(type)
    {
        if (this.current !== type) {
            this.current = type;
            this.element.style.cursor = type;
        }
    }
}

Cursor.element = null;
Cursor.current = null;
