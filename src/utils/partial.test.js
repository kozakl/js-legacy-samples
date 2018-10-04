import partial from './partial';

const add = (a, b)=> a + b,
      inc = (num)=> num + 1;

describe('partial', ()=> {
    test('test1 multi args', ()=> {
        expect(partial(add, 10, 10)()).toBe(20);
    });
    test('test2 one arg', ()=> {
        expect(partial(inc, 10)()).toBe(11);
    });
});
