using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public float bounce; // 10
    public FloatVariable maxHealth;

    [ReadOnlyInspector]
    public float currentHealth;

    private void Start()
    {
        currentHealth = maxHealth.CurrentValue;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (
            other.gameObject.TryGetComponent<Health>(out Health playerHealth) &&
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

            Debug.Log("currentHealth " + currentHealth);

            if (currentHealth <= 0)
            {
                Die();
            }
        }
    }

    private void Die()
    {
        this.gameObject.transform.Rotate(0f, 0f, 45f);
        this.GetComponent<BoxCollider2D>().enabled = false;

    }

    void OnBecameInvisible()
    {
        if (currentHealth <= 0)
        {
            Destroy(gameObject, 0.75f);
        }
    }
}
