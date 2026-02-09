using UnityEditor;
using UnityEngine;
using UnityEngine.SceneManagement;

[RequireComponent(typeof(BoxCollider2D))]
public class EndLevel : MonoBehaviour
{
    [SerializeField]
    private ParticleSystem particles;
    [SerializeField]
    private AudioClip audioClip;

    [Space (10)]
    [Header("Scene's name to load after the collider is triggered"), SerializeField]
    private SceneAsset sceneToLoad;
    [Space (10)]

    [Header("Broadcast event channels"), SerializeField]
    private SceneEventChannel onLevelEnded;
    [SerializeField]
    private PlaySoundAtEventChannel sfxAudioChannel;

    private bool hasBeenTriggered = false;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player") && !hasBeenTriggered)
        {
            hasBeenTriggered = true;
            if (sceneToLoad != null)
            {
                particles.Play();
                sfxAudioChannel.Raise(audioClip, transform.position);
                onLevelEnded.Raise(sceneToLoad);
            } else {
                Debug.LogError("Level missing");
            }
        }
    }
}
