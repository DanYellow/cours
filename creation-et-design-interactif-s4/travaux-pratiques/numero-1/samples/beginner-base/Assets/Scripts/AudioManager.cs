using UnityEngine;
using UnityEngine.Audio;

// public static class
public class AudioManager : MonoBehaviour
{
    public AudioSource audioSource;
    public AudioMixerGroup soundEffectMixer;
    public AudioMixerGroup musicEffectMixer;
    public AudioClip[] playlist;
    private int musicIndex;

    public static AudioManager instance;

    private void Awake()
    {
        if (instance != null)
        {
            Debug.LogWarning("Il y a plus d'une instance de " + GetType().Name + " dans la scène");
            return;
        }

        instance = this;
    }

    // Start is called before the first frame update
    void Start()
    {
        audioSource.clip = playlist[0];
        audioSource.Play();
    }

    // Update is called once per frame
    void Update()
    {
        if (!audioSource.isPlaying)
        {
            PlayNextMusic();
        }
    }

    void PlayNextMusic()
    {
        musicIndex = (musicIndex + 1) % playlist.Length;
        audioSource.clip = playlist[musicIndex];
        audioSource.outputAudioMixerGroup = musicEffectMixer;
        audioSource.Play();
    }

    void PlayRandomSoundClip()
    {
        musicIndex = (musicIndex + Random.Range(1, playlist.Length - 1)) % playlist.Length;
        audioSource.clip = playlist[musicIndex];
        audioSource.outputAudioMixerGroup = musicEffectMixer;
        audioSource.Play();
    }

    public AudioSource PlayClipAt(AudioClip clip, Vector3 pos)
    {
        GameObject tempGO = new GameObject("TempAudio");
        tempGO.transform.position = pos;
        AudioSource audioSource = tempGO.AddComponent<AudioSource>();
        audioSource.clip = clip;
        audioSource.outputAudioMixerGroup = soundEffectMixer;
        audioSource.Play();
        Destroy(tempGO, clip.length);
        return audioSource;
    }
}
