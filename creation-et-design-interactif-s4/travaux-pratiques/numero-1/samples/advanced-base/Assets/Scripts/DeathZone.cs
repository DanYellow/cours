using UnityEngine;
using System.Collections;

public class DeathZone : MonoBehaviour
{
    public Vector3Variable currentCheckpoint;

    private void OnTriggerEnter2D(Collider2D other) {
        if (
            other.CompareTag("Player") &&
            other.gameObject.TryGetComponent<PlayerHealth>(out PlayerHealth playerHealth)
        )
        {
            playerHealth.TakeDamage(0.5f);
            other.transform.position = currentCheckpoint.CurrentValue;
        }
    }
}