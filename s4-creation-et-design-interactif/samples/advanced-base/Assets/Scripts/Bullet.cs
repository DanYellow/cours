using System.Collections;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float moveSpeed;
    public Rigidbody2D rb;

    [SerializeField]
    private float delayBeforeAutodestruction = 2.5f;

    [SerializeField]
    private Animator animator;

    public float damage = 1f;

    private Coroutine autoDestroyCoroutine;

    [SerializeField]
    private ObjectPooled objectPooled;

    IEnumerator AutoDestroy(float duration = 0)
    {
        yield return new WaitForSeconds(duration);

        if (objectPooled.Pool == null)
        {
            Destroy(gameObject);
        }
        else
        {
            objectPooled.Release();
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (
            other.gameObject.TryGetComponent(out PlayerHealth playerHealth)
        )
        {
            playerHealth.TakeDamage(damage);
        }

        animator.SetTrigger("IsCollided");
        rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;

        StopCoroutine(autoDestroyCoroutine);
        autoDestroyCoroutine = StartCoroutine(AutoDestroy(0.35f));
    }

    public void OnDisable()
    {
        rb.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezeRotation;
        rb.linearVelocity = Vector2.zero;

        if (autoDestroyCoroutine != null)
        {
            StopCoroutine(autoDestroyCoroutine);
        }

        animator.ResetTrigger("IsCollided");

        if (objectPooled.Pool == null)
        {
            Destroy(gameObject);
        }
    }

    public void ResetThyself(float shooterDirection)
    {
        rb.linearVelocity = shooterDirection * moveSpeed * transform.right.normalized;
        rb.constraints = RigidbodyConstraints2D.FreezePositionY;
        autoDestroyCoroutine = StartCoroutine(AutoDestroy(delayBeforeAutodestruction));
    }
}
