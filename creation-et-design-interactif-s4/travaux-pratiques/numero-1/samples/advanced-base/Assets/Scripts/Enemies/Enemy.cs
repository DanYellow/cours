using System.Collections;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public float bounce = 2f;
    public FloatVariable maxHealth;

    [ReadOnlyInspector]
    public float currentHealth = 0f;

    public SpriteRenderer spriteRenderer;
    public BoxCollider2D bc2d;
    public Rigidbody2D rb;
    public Animator animator;

    [Header("Components to disable after specific event. E.g. : death")]
    public Behaviour[] listComponents;

    private void Start()
    {
        currentHealth = maxHealth?.CurrentValue ?? 1f;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        // if (
        //     other.gameObject.TryGetComponent<PlayerHealth>(out PlayerHealth playerHealth) &&
        //     other.gameObject.CompareTag("Player") &&
        //     other.contacts[0].normal.y > -0.5f
        //     )
        // {
        //     playerHealth.TakeDamage(1f);
        // }

        if (other.gameObject.CompareTag("Player"))
        {
            ContactPoint2D[] contacts = new ContactPoint2D[1];
            other.GetContacts(contacts);

            Debug.Log(contacts[0].normal.y);

            // Vector2 direction = other.gameObject.transform.position - transform.position;
            // if (Vector2.Dot(direction.normalized, Vector2.up) > Mathf.Cos(Mathf.PI / 4))
            // {
            //     StartCoroutine(TakeDamage(1f));
            //     Vector2 bounceForce = Vector2.up * bounce;
            //     other.gameObject.GetComponent<Rigidbody2D>().AddForce(bounceForce, ForceMode2D.Impulse);

            //     if (currentHealth <= 0)
            //     {
            //         Die();
            //     }
            // }
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
            spriteRenderer.color = new UnityEngine.Color(0.8207547f, 0.8207547f, 0.8207547f);
            yield return new WaitForSeconds(0.25f);
            spriteRenderer.color = new Color(1, 1, 1, 1);
        }
    }

    private void Die()
    {
        rb.velocity = Vector2.zero;
        Vector2 bounceForce = Vector2.up * 1000;
        rb.AddForce(bounceForce, ForceMode2D.Impulse);
        bc2d.enabled = false;
        gameObject.transform.Rotate(0f, 0f, 80f);

        foreach (Behaviour component in listComponents)
        {
            component.enabled = false;
        }

        foreach (Transform child in transform)
        {
            child.gameObject.SetActive(false);
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
