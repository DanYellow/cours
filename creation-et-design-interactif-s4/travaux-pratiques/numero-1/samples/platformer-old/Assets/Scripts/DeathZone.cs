using UnityEngine;

public class DeathZone : MonoBehaviour
{    
    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            Health health = other.gameObject.GetComponent<Health>();
            health.TakeDamage(0.5f);
            if (health.GetHealth() > 0)
            {
                other.transform.position = CurrentSceneManager.instance.respawnPoint;
            }
        }
    }
}
