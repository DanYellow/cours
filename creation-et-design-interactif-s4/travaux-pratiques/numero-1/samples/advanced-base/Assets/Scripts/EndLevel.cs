using UnityEngine;

public class EndLevel : MonoBehaviour
{
    public ParticleSystem particles;
    public StringEventChannelSO OnLevelEnded;
    public string nextLevel;

    private bool hasBeenTriggered = false;
    
    private void OnTriggerEnter2D(Collider2D other) {
        if(other.gameObject.CompareTag("Player") && !hasBeenTriggered) {
            particles.Play();
            hasBeenTriggered = true;
            if(nextLevel != null) {
                OnLevelEnded.Raise(nextLevel);
            }
        }
    }
}
