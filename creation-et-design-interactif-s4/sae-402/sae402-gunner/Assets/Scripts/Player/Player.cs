using UnityEngine;

public class Player : MonoBehaviour
{
    private void Awake()
    {
        gameObject.GetComponent<Health>().onDie += Die;
        gameObject.GetComponent<Health>().SetHealth(100);
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        DetectedByEnemy();
    }

    void Update() {
        if(Input.GetKeyDown(KeyCode.H)) {
            Hurt();
        }
    }

    void Hurt() {
        if(gameObject.TryGetComponent<Health>(out Health health)) {
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
            Debug.Log(other.contacts[0].normal.x);
            // _animator.SetTrigger("IsHit");
        }
    }
}
