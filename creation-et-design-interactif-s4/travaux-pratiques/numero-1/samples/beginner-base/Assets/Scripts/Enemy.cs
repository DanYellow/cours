using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public float bounce; // 10
    public FloatVariable maxHealth;

    [ReadOnlyInspector]
    public float currentHealth;

    public VoidEventChannelSO onEnemyDeath;

    private void Start()
    {
        currentHealth = maxHealth.CurrentValue;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (
        //    other.gameObject.TryGetComponent<Health>(out Health playerHealth) &&
           other.gameObject.TryGetComponent<HealthBadExample>(out HealthBadExample playerHealth) &&
            other.gameObject.CompareTag("Player") &&
            other.contacts[0].normal.y > -0.5f
            )
        {
           playerHealth.TakeDamage(1f);
        }

        if (other.contacts[0].normal.y < -0.5f)
        {
            currentHealth -= 1f;
            Vector2 bounceForce = Vector2.up * bounce;

            other.gameObject.GetComponent<Rigidbody2D>().AddForce(bounceForce, ForceMode2D.Impulse);

            if (currentHealth <= 0)
            {
                StartCoroutine(SlowTime());
                Die();
            }
        }
    }

    IEnumerator SlowTime()
    {
        Time.timeScale = 0.5f;
        // yield return new WaitForSeconds(0.25f);
        yield return new WaitForSecondsRealtime(0.25f);
        Time.timeScale = 1f;
    }

    private void Die()
    {
        this.gameObject.transform.Rotate(0f, 0f, 45f);
        this.GetComponent<BoxCollider2D>().enabled = false;
        onEnemyDeath.Raise();

    }

    void OnBecameInvisible()
    {
        if (currentHealth <= 0)
        {
            Debug.Log("Destroyed");
            Destroy(gameObject, 0.75f);
        }
    }
}
