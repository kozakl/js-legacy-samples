/**
 * @author kozakluke@gmail.com
 */
class Main
{
    constructor()
    {
        window.onload = this.onLoad.bind(this);
    }
    
    /**
     * @private
     */
    onLoad()
    {
        console.log(MathUtil.rndRange(0, 100));
    }
}

Main.instance = new Main();
