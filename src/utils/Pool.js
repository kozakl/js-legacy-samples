export default class Pool
{
    static pools = [];
    
    static get(Type, autoFree = false)
    {
        const pool = this.getPool(Type);
        if (pool.length > 0)
            return autoFree ? pool[0] : pool.pop();
        else
            return autoFree ? this.free(Type, new Type()) : new Type();
    }
    
    static getPool(Type)
    {
        return this.pools[Type] || (this.pools[Type] = []);
    }
    
    static free(Type, ...args)
    {
        this.getPool(Type).push(...args);
        return args[0];
    }
    
    static freeArray(Type, array)
    {
        const pool = this.getPool(Type);
        for (let i = array.length; i--;)
            array[i] && pool.push(array[i]);
        
        array.length = 0;
    }
}
