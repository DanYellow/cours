using UnityEngine;

public class EndLevel : MonoBehaviour
{
    public ParticleSystem particles;
    public StringEventChannel onLevelEnded;
    public PlaySoundAtEventChannel sfxAudioChannel;
    public string nextLevelName;
    public AudioClip audioClip;

    private bool hasBeenTriggered = false;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player") && !hasBeenTriggered)
        {
            hasBeenTriggered = true;
            if (nextLevelName != null)
            {
                particles.Play();
                sfxAudioChannel.Raise(audioClip, transform.position);
                onLevelEnded.Raise(nextLevelName);
            } else {
                Debug.LogError("Level missing");
            }
        }
    }
}
