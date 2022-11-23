using UnityEngine;
using UnityEngine.Audio;

public class AudioManager : MonoBehaviour
{
    public AudioSource audioSource;
    public AudioMixerGroup soundEffectMixer;
    public AudioMixerGroup musicEffectMixer;
    public AudioClip[] playlist;
    private int musicIndex;

    // Start is called before the first frame update
    void Start()
    {
        audioSource.clip = playlist[0];
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

    // void PlayRandomSoundClip()
    // {
    //     musicIndex = (musicIndex + Random.Range(1, playlist.Length - 1)) % playlist.Length;
    //     audioSource.clip = playlist[musicIndex];
    //     audioSource.outputAudioMixerGroup = musicEffectMixer;
    //     audioSource.Play();
    // }

    public void PlayClipAt(GameObject go)
    {
        AudioClip clip = go.GetComponent<PickupItem>().audioClip;
        Vector3 pos = go.transform.position;
        GameObject tempGO = new GameObject("TempAudio");
        tempGO.transform.position = pos;
        AudioSource audioSource = tempGO.AddComponent<AudioSource>();
        audioSource.clip = clip;
        audioSource.outputAudioMixerGroup = soundEffectMixer;
        audioSource.Play();
        Destroy(tempGO, clip.length);
    }
}
