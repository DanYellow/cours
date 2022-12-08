using System.Collections;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float moveSpeed;
    public Rigidbody2D rb;

    public Animator animator;

    private void Start()
    {
        rb.velocity = transform.right * moveSpeed;
        StartCoroutine(AutoDestroy());
    }

    IEnumerator AutoDestroy()
    {
        yield return new WaitForSeconds(2.5f);
        Destroy(gameObject);
    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        // if (
        //     collision.collider.gameObject.layer == LayerMask.NameToLayer("Enemy")
        // )
        // {
        //     if (collision.gameObject.TryGetComponent<Health>(out Health health))
        //     {
        //         health.TakeDamage(3);
        //     }
        // }

        animator.SetTrigger("IsCollided");
        rb.constraints = RigidbodyConstraints2D.FreezeRotation;
        Destroy(gameObject, 0.5f);
    }
}
