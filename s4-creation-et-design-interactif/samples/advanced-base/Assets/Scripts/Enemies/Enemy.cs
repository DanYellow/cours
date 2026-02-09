using UnityEngine;
using System.Collections;

public class Enemy : MonoBehaviour, IHurtable
{
    public FloatVariable maxHealth;

    [ReadOnlyInspector]
    public float currentHealth = 0f;

    [SerializeField]
    private SpriteRenderer spriteRenderer;

    [SerializeField]
    private Rigidbody2D rb;
    [SerializeField]
    private Animator animator;

    [ReadOnlyInspector]
    private Color originalColor;

    [SerializeField]
    private Color hitColor = new Color(0.8207547f, 0.8207547f, 0.8207547f);

    private WaitForSeconds flashHitDelay = new WaitForSeconds(0.25f);

    [Header("Components to disable after specific event. E.g. : death"), SerializeField]
    private Behaviour[] listComponents;

    private float bounceFactorOnDeath = 5.25f;

    private void Awake()
    {
        // If no max health is defined then the enemy heath is 1
        currentHealth = maxHealth != null ? maxHealth.CurrentValue : 1f;
        originalColor = spriteRenderer.color;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (currentHealth <= 0) return;

        ContactPoint2D contact = other.GetContact(0);

        if (contact.normal.y < -0.5f) return;

        if (
            other.gameObject.TryGetComponent(out PlayerHealth playerHealth) &&
            other.gameObject.CompareTag("Player")
            )
        {
            playerHealth.TakeDamage(1f);
        }
    }

    public void Hurt()
    {
        StartCoroutine(TakeDamage(1f));

        if (currentHealth <= 0)
        {
            StartCoroutine(Die());
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
            spriteRenderer.color = hitColor;
            yield return flashHitDelay;
            spriteRenderer.color = originalColor;
        }
    }

    private IEnumerator Die()
    {
        if (rb.bodyType != RigidbodyType2D.Dynamic)
        {
            rb.bodyType = RigidbodyType2D.Dynamic;
        }

        foreach (Behaviour component in listComponents)
        {
            component.enabled = false;
        }

        foreach (Collider2D collider in gameObject.GetComponentsInChildren<Collider2D>())
        {
            collider.enabled = false;
        }

        foreach (Transform child in transform)
        {
            child.gameObject.SetActive(false);
        }

        rb.linearVelocity = Vector2.zero;
        rb.mass = 1;
        rb.gravityScale = 3;
        yield return null;
        Vector2 bounceForce = Vector2.up * bounceFactorOnDeath;
        rb.AddForce(bounceForce, ForceMode2D.Impulse);

        float startZAngle = transform.eulerAngles.z;
        float current = 0;
        float duration = 0.85f;

        yield return null;
        while (current <= 1)
        {
            // https://chicounity3d.wordpress.com/2014/05/23/how-to-lerp-like-a-pro/
            float angle = Mathf.LerpAngle(startZAngle, 180, Mathf.Sin(current * Mathf.PI * 0.5f));

            transform.eulerAngles = new Vector3(transform.rotation.eulerAngles.x, transform.rotation.eulerAngles.y, angle);

            current += Time.deltaTime / duration;

            yield return null;
        }
    }

    void OnBecameInvisible()
    {
        if (currentHealth <= 0)
        {
            Destroy(gameObject, 0.15f);
        }
    }
}
