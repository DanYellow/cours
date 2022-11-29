using UnityEngine;

public class DeathZone : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D other) {
        if (
            other.CompareTag("Player") &&
            other.gameObject.TryGetComponent<PlayerHealth>(out PlayerHealth playerHealth)
        )
        {
            playerHealth.TakeDamage(0.5f);
            other.transform.position = other.GetComponent<PlayerSpawn>().currentSpawnPosition;
        }
    }
}