class ObjectPool
{
    static pools = [];
    
    static getObject(Type, ...args)
    {
        const pool = this.getPool(Type);
        if(pool.length > 0)
            return pool.pop();
        else
        {
            if (args.length < 1)
                return new Type();
            else
            {
                switch (args.length)
                {
                    case 1 : return new Type(args[0]);
                    case 2 : return new Type(args[0], args[1]);
                    case 3 : return new Type(args[0], args[1], args[2]);
                    case 4 : return new Type(args[0], args[1], args[2], args[3]);
                    case 5 : return new Type(args[0], args[1], args[2], args[3], arguments[4]);
                    default : return new Type();
                }
            }
        }
    }
    
    static disposeObject(object, Type)
    {
        this.getPool(Type).push(object);
    }
    
    /**
     * @private
     */
    static getPool(Type)
    {
        return this.pools[Type] || (this.pools[Type] = []);
    }
}
