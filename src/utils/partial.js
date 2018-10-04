export default (fn, ...args)=> fn.bind(null, ...args);
