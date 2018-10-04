export default (...args)=>
{
    return args.reduce((f, g)=> (...args)=> g(f(...args)));
}
