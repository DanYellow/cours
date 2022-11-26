using System.Collections;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public float bounce = 2f;
    public FloatVariable maxHealth;

    [ReadOnlyInspector]
    public float currentHealth;

    public SpriteRenderer spriteRenderer;
    public BoxCollider2D bc2d;
    public Animator animator;

    private void Start()
    {
        currentHealth = maxHealth.CurrentValue;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (
            other.gameObject.TryGetComponent<PlayerHealth>(out PlayerHealth playerHealth) &&
            other.gameObject.CompareTag("Player") &&
            other.contacts[0].normal.y > -0.5f
            )
        {
            playerHealth.TakeDamage(1f);
        }

        if (other.contacts[0].normal.y < -0.5f)
        {
            StartCoroutine(TakeDamage(1f));
            Vector2 bounceForce = Vector2.up * bounce;
            other.gameObject.GetComponent<Rigidbody2D>().AddForce(bounceForce, ForceMode2D.Impulse);

            if (currentHealth <= 0)
            {
                Die();
            }
        }

        if(other.gameObject.CompareTag("Saw")) {
            Die();
        }
    }

    IEnumerator TakeDamage(float damage)
    {
        currentHealth -= damage;
        if (animator)
        {
            animator.SetTrigger("IsHit");
        }
        else
        {
            spriteRenderer.color = UnityEngine.Color.black;
            yield return new WaitForSeconds(0.25f);
            spriteRenderer.color = new Color(1, 1, 1, 1);
        }
    }

    private void Die()
    {
        bc2d.enabled = false;
        this.gameObject.transform.Rotate(0f, 0f, 45f);
    }

    void OnBecameInvisible()
    {
        if (currentHealth <= 0)
        {
            Destroy(gameObject, 0.15f);
        }
    }
}
