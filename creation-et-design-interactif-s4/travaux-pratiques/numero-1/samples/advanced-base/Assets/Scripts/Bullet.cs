using System.Collections;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float moveSpeed;
    public Rigidbody2D rb;

    public GameObject stream;

    private void Start()
    {
        rb.velocity = transform.right * moveSpeed;
        StartCoroutine(AutoDestroy());
    }

    IEnumerator AutoDestroy()
    {
        yield return new WaitForSeconds(5f);
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
        // gameObject.SetActive(false);

        Destroy(gameObject);
    }
}
