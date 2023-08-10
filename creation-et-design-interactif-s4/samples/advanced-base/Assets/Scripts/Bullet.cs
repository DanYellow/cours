using System.Collections;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float moveSpeed;
    public Rigidbody2D rb;

    public float delayBeforeAutodestruction = 2.5f;

    public Animator animator;

    public float damage = 1f;

    public System.Action<Bullet> callback;

    private Coroutine autoDestroyCoroutine;

    [HideInInspector]
    public Transform invoker;

    public void Initialize()
    {
        // rb.velocity = transform.right * moveSpeed;
        rb.velocity = transform.right * moveSpeed;
        autoDestroyCoroutine = StartCoroutine(AutoDestroy(delayBeforeAutodestruction));

    }

    private void OnEnable() {
    }

    IEnumerator AutoDestroy(float duration = 0)
    {
        yield return new WaitForSeconds(duration);
        if(invoker == null) {
            Destroy(gameObject);
        } else {
            // invoker.GetComponent<ObjectPooling>().Release("bullet", gameObject);
        }
    }

    void OnTriggerEnter2D(Collider2D other)
    {
        if (
            other.gameObject.TryGetComponent<PlayerHealth>(out PlayerHealth playerHealth)
        )
        {
            playerHealth.TakeDamage(damage);
        }

        animator.SetTrigger("IsCollided");
        rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
        callback(this);
        // autoDestroyCoroutine = StartCoroutine(AutoDestroy(0.35f));
    }

    public void OnDisable()
    {
        print("ddaaaa");
        rb.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezeRotation;
        rb.velocity = Vector2.zero;
        // StopCoroutine(autoDestroyCoroutine);
        animator.ResetTrigger("IsCollided");

        // if (invoker == null)
        // {
        //     Destroy(gameObject);
        // }
    }

    public void OnContact(System.Action<Bullet> callback) {
        callback(this);
    }
}
