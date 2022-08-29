using UnityEngine;

public class Player : MonoBehaviour
{
    private PlayerMovement _playerMovement;
    private CapsuleCollider2D _capsuleCollider;

    private void Awake()
    {
        gameObject.GetComponent<Health>().onDie += Die;
        gameObject.GetComponent<Health>().SetHealth(100);

        // Physics2D.IgnoreCollision(transform.Find("Collider").GetComponent<CapsuleCollider2D>(), GetComponent<CapsuleCollider2D>());
        _playerMovement = gameObject.GetComponent<PlayerMovement>();
        _capsuleCollider = this.GetComponent<CapsuleCollider2D>();
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        DetectedByEnemy();
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.H))
        {
            Hurt();
        }
    }

    void Hurt()
    {
        if (gameObject.TryGetComponent<Health>(out Health health))
        {
            health.TakeDamage(3);
        }
    }

    void Die()
    {
        transform.Rotate(0, 0, 90f);
        Collider2D[] listColliders = transform.GetComponents<Collider2D>();
        foreach (Collider2D collider in listColliders)
        {
            collider.enabled = false;
        }
        // Destroy(gameObject, 0.75f);
    }

    private void OnDestroy()
    {
        gameObject.GetComponent<Health>().onDie -= Die;
    }

    void DetectedByEnemy()
    {
        Debug.DrawRay(transform.position, transform.right * 2, Color.red);
        RaycastHit2D hit = Physics2D.Raycast(
            transform.position,
            transform.right,
            2,
            (1 << LayerMask.NameToLayer("BackEnemy"))
        );
        if (hit.collider != null)
        {
            hit.collider.transform.parent.transform.Rotate(0f, 180f, 0f);
        }
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.collider.gameObject.layer == LayerMask.NameToLayer("Enemy"))
        {
            Physics2D.IgnoreLayerCollision(LayerMask.NameToLayer("Default"), LayerMask.NameToLayer("Enemy"), true);
            if (other.gameObject.TryGetComponent<Health>(out Health health) && _playerMovement.IsDashing())
            {
                Debug.Log(other.contacts[0].normal.x);
                health.TakeDamage(10);
            }
        }
    }

    private void OnCollisionExit2D(Collision2D other)
    {
        if (other.collider.gameObject.layer == LayerMask.NameToLayer("Enemy"))
        {
            Physics2D.IgnoreLayerCollision(LayerMask.NameToLayer("Default"), LayerMask.NameToLayer("Enemy"), false);
        }
    }

}
