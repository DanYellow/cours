
using UnityEngine;

public class EnemyPatrol : MonoBehaviour
{
    public Rigidbody2D rb;

    [Header("Movement management")]
    public float speed = 0.5f;

    [Tooltip("Define how long the enemy will move")]
    public float moveDuration = 5f;

    [Tooltip("If false, the enemy will move endlessly back and forth")]
    public bool canWait = true;

    [Header("Collision detection")]
    public LayerMask obstacleLayersMask;
    public float obstacleDetectionLength = 0.15f;
    public BoxCollider2D bc;
    [UnityEngine.Serialization.FormerlySerializedAs("groundCheckRadius")]
    public float obstacleCheckRadius = 0.25f;

    public bool isFacingRight = true;

    private void FixedUpdate()
    {
        if (HasCollisionWithObstacle() || HasNotTouchedGround())
        {
            Flip();
        }

        Move();
    }

    private void Move()
    {
        rb.linearVelocity = new Vector2(speed * Mathf.Sign(transform.localScale.x) * (isFacingRight ? 1 : -1), rb.linearVelocity.y);
    }

    public bool HasCollisionWithObstacle()
    {
        Vector2 startCast = new Vector2(
            bc.bounds.center.x + (Mathf.Sign(transform.localScale.x) * (isFacingRight ? 1 : -1) * bc.bounds.extents.x),
            bc.bounds.center.y
        );
        Vector2 endCast = new Vector2(startCast.x + Mathf.Sign(transform.localScale.x) * (isFacingRight ? 1 : -1) * obstacleDetectionLength, startCast.y);

        RaycastHit2D hitObstacle = Physics2D.Linecast(startCast, endCast, obstacleLayersMask);

        return hitObstacle.collider != null;
    }

    public bool HasNotTouchedGround()
    {
        Vector2 center = new Vector2(
            bc.bounds.center.x + (Mathf.Sign(transform.localScale.x) * (isFacingRight ? 1 : -1) * bc.bounds.extents.x),
            bc.bounds.min.y
        );

        return !Physics2D.OverlapCircle(center, obstacleCheckRadius, obstacleLayersMask);
    }

    void OnDrawGizmos()
    {
        if (bc != null)
        {
            Gizmos.color = Color.aquamarine;
            Gizmos.DrawWireSphere(
                new Vector2(
                    bc.bounds.center.x + (Mathf.Sign(transform.localScale.x) * (isFacingRight ? 1 : -1) * bc.bounds.extents.x),
                    bc.bounds.min.y
                ),
                obstacleCheckRadius
            );

            Gizmos.color = Color.red;
            Vector2 startCast = new Vector2(
                bc.bounds.center.x + (Mathf.Sign(transform.localScale.x) * (isFacingRight ? 1 : -1) * bc.bounds.extents.x),
                bc.bounds.center.y
            );
            Gizmos.DrawLine(
                startCast,
                new Vector2(startCast.x + Mathf.Sign(transform.localScale.x) * (isFacingRight ? 1 : -1) * obstacleDetectionLength, startCast.y)
            );
        }
    }

    public void Flip()
    {
        Vector3 localScale = transform.localScale;
        localScale.x *= -1f;
        transform.localScale = localScale;
    }
}
