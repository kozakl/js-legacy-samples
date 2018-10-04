/**
 * @author kozakluke@gmail.com
 */
class SoundUtil
{
    static pauseSound()
    {
        const n = Howler._howls.length;
        for (var i = 0; i < n; ++i)
        {
            const howl   = Howler._howls[i],
                  sounds = howl._sounds,
                  m      = sounds.length;
            for (var j = 0; j < m; ++j)
            {
                const sound = sounds[j];
                if (!sound._paused) {
                    sound.needResume = true;
                    howl.pause(sound._id, true);
                }
            }
        }
    }
    
    static resumeSound()
    {
        const n = Howler._howls.length;
        for (var i = 0; i < n; ++i)
        {
            const howl   = Howler._howls[i],
                  sounds = howl._sounds,
                  m      = sounds.length;
            for (var j = 0; j < m; ++j)
            {
                const sound = sounds[j];
                if (sound.needResume) {
                    sound.needResume = false;
                    howl.play(sound._id);
                }
            }
        }
    }
}
