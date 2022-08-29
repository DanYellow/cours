using UnityEngine;
using System.Collections;

public class Enemy : MonoBehaviour
{
    public enum EnemyType
    {
        Flying,
        Ground,
    }

    float speed = 5f;
    //adjust this to change how high it goes
    float height = 0.2f;

    private Animator _animator;
    private Rigidbody2D _rb;

    [SerializeField]
    private EnemyType type;

    private Vector3 _originPosition;

    private void Awake()
    {
        gameObject.GetComponent<Health>().onDie += Die;
        gameObject.GetComponent<Health>().onHit += OnDamageProxy;

        _animator = transform.GetComponent<Animator>();
        _rb = transform.GetComponent<Rigidbody2D>();

        if (_rb && type == EnemyType.Flying)
        {
            _rb.gravityScale = 0f;
        }

        _originPosition = transform.position;

        // Collider2D[] listColliders = transform.GetComponents<Collider2D>();
        // foreach (Collider2D collider in listColliders)
        // {
        //     if(transform.Find("Collider").GetComponent<BoxCollider2D>() != null) {
        //         Physics2D.IgnoreCollision(transform.Find("Collider").GetComponent<BoxCollider2D>(), collider);
        //     }
        // }
    }

    private void FixedUpdate()
    {
        // Physics.IgnoreLayerCollision(Enemy.collider, Enemy.collider);
    }

    private void Update()
    {
        Move();
    }

    // InvokeRepeating("LaunchProjectile", 10.0f, 1f);

    public void Die()
    {
        transform.Rotate(0, 0, 90f);
        Collider2D[] listColliders = transform.GetComponents<Collider2D>();
        foreach (Collider2D collider in listColliders)
        {
            collider.enabled = false;
        }
        Destroy(gameObject, 0.75f);
    }

    private void OnDestroy()
    {
        gameObject.GetComponent<Health>().onDie -= Die;
    }

    private void Move()
    {
        if (type == EnemyType.Flying)
        {
            float newY = (Mathf.Sin(Time.time * speed) * height) + _originPosition.y;
            transform.position = new Vector3(transform.position.x, newY, transform.position.z);
        }
    }

    void OnDamageProxy()
    {
        _animator.SetTrigger("IsHit");
        StartCoroutine(OnDamage());
    }

    IEnumerator OnDamage()
    {
        this.GetComponent<Renderer>().material.color = UnityEngine.Color.clear;
        yield return new WaitForSeconds(0.05f);
        this.GetComponent<Renderer>().material.color = UnityEngine.Color.white;
        yield return new WaitForSeconds(0.05f);
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        // if(other.collider.gameObject.tag == "Player") {
        //     Debug.Log(other.contacts[0].normal.y);
        //     Debug.Log(other.contacts[0].normal.x);
        // }
        // if (other.collider.gameObject.layer == LayerMask.NameToLayer("Enemy"))
        // {
            // _animator.SetTrigger("IsHit");
        // }
    }


    // private void OnCollisionEnter2D(Collision2D other)
    // {
    //     if (other.collider.gameObject.layer == LayerMask.NameToLayer("Projectile"))
    //     {
    //         // Debug.Log(collision.contacts[0].normal.x);
    //         _animator.SetTrigger("IsHit");
    //     }
    // }
}
