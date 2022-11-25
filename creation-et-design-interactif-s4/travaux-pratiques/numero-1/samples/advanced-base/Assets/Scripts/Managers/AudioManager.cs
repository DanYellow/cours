using UnityEngine;
using UnityEngine.Audio;
using System.Collections;

public class AudioManager : MonoBehaviour
{
    public AudioSource mainAudioSource;
    public AudioMixerGroup soundEffectMixer;
    public AudioMixerGroup musicEffectMixer;
    public AudioClip[] playlist;
    private int musicIndex;
    private float elapsedTime = 0;
    private bool isGamePaused;
    private float volumeOnPaused = 0.15f;
    private float volumeOnPlay = 1f;

    // Start is called before the first frame update
    void Start()
    {
        mainAudioSource.clip = playlist[0];
    }

    // Update is called once per frame
    void Update()
    {
        if (!mainAudioSource.isPlaying)
        {
            PlayNextMusic();
        }

        if (isGamePaused)
        {
           StartCoroutine(DecreaseVolume());
        }
        else
        {
           StartCoroutine(IncreaseVolume());
        }
    }

    IEnumerator IncreaseVolume()
    {
        while (mainAudioSource.volume < volumeOnPlay)
        {
            mainAudioSource.volume += 0.0003f;
            yield return null;
        }
    }

    IEnumerator DecreaseVolume()
    {
        while (mainAudioSource.volume > volumeOnPaused)
        {
            mainAudioSource.volume -= 0.0003f;
            yield return null;
        }
    }

    void PlayNextMusic()
    {
        musicIndex = (musicIndex + 1) % playlist.Length;
        mainAudioSource.clip = playlist[musicIndex];
        mainAudioSource.outputAudioMixerGroup = musicEffectMixer;
        mainAudioSource.Play();
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

    public void OnTogglePause(bool _isGamePaused)
    {
        isGamePaused = _isGamePaused;
        // if(isGamePaused) {
        //     mainAudioSource.volume = 0.25f;
        // } else {
        //     mainAudioSource.volume = 1;
        // }
    }
}
