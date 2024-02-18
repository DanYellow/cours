using UnityEngine;

public class Shell : MonoBehaviour
{
    public BoxCollider2D bc;
    public Rigidbody2D rb;
    public Animator animator;

    [Header("Layers")]
    public LayerMask obstacleLayers;

    public float speed = 0.3f;

    private void FixedUpdate()
    {
        rb.AddForce(new Vector2(speed * transform.right.normalized.x, rb.velocity.y) * rb.mass, ForceMode2D.Impulse);

        Vector3 startCast = new Vector2(bc.bounds.center.x + (transform.right.normalized.x * (bc.bounds.size.x / 2)), bc.bounds.center.y);
        RaycastHit2D hit = Physics2D.Linecast(
            startCast,
            new Vector2(startCast.x + (transform.right.normalized.x * 0.1f), startCast.y),
            obstacleLayers
        );

        if (hit.collider != null)
        {
            Hit();
        }
    }

    private void Hit()
    {
        animator.SetTrigger("IsHit");
        transform.Rotate(0f, 180f, 0f);
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
}
