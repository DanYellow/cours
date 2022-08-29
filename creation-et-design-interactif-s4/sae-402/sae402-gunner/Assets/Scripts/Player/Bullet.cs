using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    [SerializeField]
    private float _moveSpeed;

    private Rigidbody2D _rb;

    public GameObject stream;

    void Awake()
    {
        _rb = GetComponent<Rigidbody2D>();
    }
    void Start()
    {
    }

    private void OnEnable()
    {
        _moveSpeed = 12.0f;
        _rb.velocity = transform.right * _moveSpeed;
        StartCoroutine(AutoDestroy());
        // Physics2D.IgnoreCollision(GameObject.FindWithTag("PlayerBlocker").GetComponent<CapsuleCollider2D>(), GetComponent<BoxCollider2D>());
    }

    IEnumerator AutoDestroy()
    {
        yield return new WaitForSeconds(5f);
        gameObject.SetActive(false);
    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        if (
            collision.collider.gameObject.layer == LayerMask.NameToLayer("Enemy")
        )
        {
            if (collision.gameObject.TryGetComponent<Health>(out Health health))
            {
                health.TakeDamage(3);
            }
        }
        gameObject.SetActive(false);

        // Debug.Log(collision.contacts[0].normal.x);
        // Destroy(gameObject);
    }
}
