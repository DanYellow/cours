using UnityEngine;

public class Enemy : MonoBehaviour
{
    private Animator _animator;

    private void Awake()
    {
        gameObject.GetComponent<Health>().onDie += Die;
        _animator = transform.GetComponent<Animator>();
    }

    // InvokeRepeating("LaunchProjectile", 10.0f, 1f);

    public void Die()
    {
        Collider2D[] listColliders = transform.GetComponentsInChildren<Collider2D>();
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


    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.collider.gameObject.layer == LayerMask.NameToLayer("Projectile"))
        {
            // Debug.Log(collision.contacts[0].normal.x);
            _animator.SetTrigger("IsHit");
        }
    }
}
