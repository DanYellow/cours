using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyAdvanced : MonoBehaviour
{
    public float bounce; // 10
    public FloatVariable maxHealth;

    [ReadOnlyInspector]
    public float currentHealth;

    public VoidEventChannelSO onEnemyDeath;

    public bool isBadExample = true;

    private void Start()
    {
        currentHealth = maxHealth.CurrentValue;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (isBadExample)
        {
            if (other.gameObject.TryGetComponent<HealthBadExample>(out HealthBadExample badPlayerHealth) &&
            other.gameObject.CompareTag("Player")
            )
            {
                badPlayerHealth.TakeDamage(1f);
            }
        }
        else
        {
            if (
                other.gameObject.TryGetComponent(out Health playerHealth) &&
                other.gameObject.CompareTag("Player")
            )
            {
                playerHealth.TakeDamage(1f);
            }
        }
    }

    public void TakeDamage()
    {
        currentHealth--;
        Debug.Log("currentHealth " + currentHealth);
        if (currentHealth == 0)
        {
            StartCoroutine(SlowTime());
            Die();
        }
    }

    IEnumerator SlowTime()
    {
        Time.timeScale = 0.5f;
        yield return new WaitForSecondsRealtime(0.25f);
        Time.timeScale = 1f;
    }

    public void Die()
    {
        this.gameObject.transform.Rotate(0f, 0f, 45f);
        this.GetComponent<BoxCollider2D>().enabled = false;
        onEnemyDeath.Raise();

    }

    void OnBecameInvisible()
    {
        if (currentHealth <= 0)
        {
            Destroy(gameObject, 0.75f);
        }
    }
}
