using System.Collections;
using UnityEngine;

public class Enemy : MonoBehaviour
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

        if (!other.gameObject.CompareTag("Player")) return;

        ContactPoint2D contact = other.GetContact(0);
        // if (isBadExample)
        // {
        //     if (other.gameObject.TryGetComponent(out HealthBadExample badPlayerHealth) &&
        //     contact.normal.y > -0.5f
        //     )
        //     {
        //         badPlayerHealth.TakeDamage(1f);
        //     }
        // }
        // else
        // {
        //     if (
        //         other.gameObject.TryGetComponent(out Health playerHealth) &&
        //             contact.normal.y > -0.5f
        //     )
        //     {
        //         playerHealth.TakeDamage(1f);
        //     }
        // }

        if (contact.normal.y < -0.5f)
        {
            currentHealth -= 1f;
            Vector2 bounceForce = Vector2.up * bounce;
            other.rigidbody.linearVelocityY = 0;
            other.rigidbody.AddForce(bounceForce, ForceMode2D.Impulse);

            if (currentHealth <= 0)
            {
                // StartCoroutine(SlowTime());
                Die();
            }
        }
        else
        {
            if (isBadExample)
            {
                if (other.gameObject.TryGetComponent(out HealthBadExample badPlayerHealth)
                )
                {
                    badPlayerHealth.TakeDamage(1f);
                }
            }
            else
            {
                if (
                    other.gameObject.TryGetComponent(out Health playerHealth)
                )
                {
                    playerHealth.TakeDamage(1f);
                }
            }
        }
    }
    IEnumerator SlowTime()
    {
        Time.timeScale = 0.5f;
        yield return new WaitForSecondsRealtime(0.25f);
        Time.timeScale = 1f;
    }

    private void Die()
    {
        gameObject.transform.Rotate(0f, 0f, 45f);
        GetComponent<BoxCollider2D>().enabled = false;
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
