using UnityEngine;

[RequireComponent(typeof(BoxCollider2D))]
public class LevelExit : MonoBehaviour
{
    [SerializeField]
    private ParticleSystem particles;
    [SerializeField]
    private AudioClip audioClip;

    [Space(10)]
    [Header("Scene's name to load after the collider is triggered"), SerializeField, HideInInspector]
    public int sceneToLoad;
    [Space(10)]

    [Header("Broadcast event channels"), SerializeField]
    private IntEventChannel onLevelEnded;
    [SerializeField]
    private PlaySoundAtEventChannel sfxAudioChannel;

    private bool hasBeenTriggered = false;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player") && !hasBeenTriggered)
        {
            hasBeenTriggered = true;
            particles.Play();
            sfxAudioChannel.Raise(audioClip, transform.position);
            onLevelEnded.Raise(sceneToLoad);
        }
    }
}
