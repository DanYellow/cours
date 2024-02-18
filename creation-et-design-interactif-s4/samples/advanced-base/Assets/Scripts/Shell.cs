using UnityEngine;

public class Shell : MonoBehaviour
{
    public BoxCollider2D bc;
    public Rigidbody2D rb;
    public Animator animator;
    public Enemy enemy;

    public float speed = 0.3f;

    private bool isVisible;

    public ParticleSystem particleEmitter;

    [Header("Layers")]
    public LayerMask obstacleLayers;

    private void Start()
    {
        particleEmitter.Stop();
    }

    private void FixedUpdate()
    {
        Vector3 startCast = new Vector2(bc.bounds.center.x + (transform.right.normalized.x * (bc.bounds.size.x / 2)), bc.bounds.center.y);
        RaycastHit2D hit = Physics2D.Linecast(
            startCast,
            new Vector2(startCast.x + (transform.right.normalized.x * 0.1f), startCast.y),
            obstacleLayers
        );

        if (hit.collider != null)
        {
            Flip();
        }

        rb.AddForce(new Vector2(speed * transform.right.normalized.x, rb.velocity.y) * rb.mass, ForceMode2D.Impulse);
    }

    private void Flip()
    {
        if (isVisible)
        {
            particleEmitter.Play();
        }
        animator.SetTrigger("IsHit");

        rb.velocity = new Vector2(-0.25f, 0.35f);

        transform.Rotate(0f, 180f, 0f);
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            enemy.Hurt();
        }
    }

    void OnDrawGizmos()
    {
        Gizmos.color = Color.magenta;
        Vector2 startCast = new Vector2(bc.bounds.center.x + (transform.right.normalized.x * (bc.bounds.size.x / 2)), bc.bounds.center.y);

        Gizmos.DrawLine(
            startCast,
            new Vector2(startCast.x + (transform.right.normalized.x * 0.1f), startCast.y)
        );
    }

    private void OnBecameVisible()
    {
        isVisible = true;
    }

    private void OnBecameInvisible()
    {
        isVisible = false;
    }
}
