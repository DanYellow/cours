
using UnityEngine;
using System.Collections;

public class EnemyPatrol : MonoBehaviour
{
    public Rigidbody2D rb;
    public Animator animator;
    public float speed;

    [ReadOnlyInspector]
    public bool isFacingRight = false;

    private bool isIdle = true;

    private float idleTime;

    [Tooltip("Define how long the enemy will walk")]
    public float walkTime = 5f;

    private bool hasCollisionWithObstacle;

    public LayerMask obstacleLayersMask;

    private WaitForSeconds waitWalkTime;
    private WaitForSeconds waitIdleTime;

    [Header("Collision detection")]
    public float obstacleDetectionLength = 0.15f;
    public BoxCollider2D bc;
    [UnityEngine.Serialization.FormerlySerializedAs("groundCheckRadius")]
    public float obstacleCheckRadius = 0.25f;

    private void Awake()
    {
        // We don't want the script to be enabled by default
        enabled = false;
    }

    private void Start()
    {
        isFacingRight = transform.right.normalized.x > 0;
        idleTime = Mathf.Round(walkTime / 2.5f);

        waitWalkTime = new WaitForSeconds(walkTime);
        waitIdleTime = new WaitForSeconds(idleTime);

        StartCoroutine(ChangeState());
    }

    private void Update()
    {
        animator.SetFloat("VelocityX", Mathf.Abs(rb.velocity.x));
    }

    private void FixedUpdate()
    {
        hasCollisionWithObstacle = HasCollisionWithObstacle();

        Vector2 startCast = new Vector2(
            bc.bounds.center.x + (transform.right.normalized.x * (bc.bounds.size.x / 2)),
            bc.bounds.center.y
        );
        Vector2 endCast = new Vector2(startCast.x + (transform.right.normalized.x * obstacleDetectionLength), startCast.y);

        RaycastHit2D hitObstacle = Physics2D.Linecast(startCast, endCast, obstacleLayersMask);
        if (hitObstacle.collider != null || !hasCollisionWithObstacle)
        {
            Flip();
        }

        if (isIdle)
        {
            Idle();
        }
        else
        {
            Move();
        }
    }

    IEnumerator ChangeState()
    {
        while (true)
        {
            // Enemy will walk during X seconds...
            isIdle = false;
            yield return waitWalkTime;

            // ...then wait during X seconds...
            isIdle = true;
            yield return waitIdleTime;
        }
    }

    private void Idle()
    {
        rb.velocity = Vector2.zero;
    }

    private void Move()
    {
        rb.velocity = new Vector2(speed * Mathf.Sign(transform.right.normalized.x), rb.velocity.y);
    }

    public bool HasCollisionWithObstacle()
    {
        Vector2 center = new Vector2(
            bc.bounds.center.x + (transform.right.normalized.x * (bc.bounds.size.x / 2)),
            bc.bounds.min.y
        );
        return Physics2D.OverlapCircle(center, obstacleCheckRadius, obstacleLayersMask);
    }

    void OnDrawGizmos()
    {
        if (bc != null)
        {
            Gizmos.DrawWireSphere(
                new Vector2(
                    bc.bounds.center.x + (transform.right.normalized.x * (bc.bounds.size.x / 2)),
                    bc.bounds.min.y
                ),
                obstacleCheckRadius
            );

            Gizmos.color = Color.green;
            Vector2 startCast = new Vector2(
                bc.bounds.center.x + (transform.right.normalized.x * (bc.bounds.size.x / 2)),
                bc.bounds.center.y
            );
            Gizmos.DrawLine(
                startCast,
                new Vector2(startCast.x + (transform.right.normalized.x * obstacleDetectionLength), startCast.y)
            );
        }
    }

    public void Flip()
    {
        isFacingRight = !isFacingRight;
        transform.Rotate(0f, 180f, 0f);
    }

    private void OnBecameVisible()
    {
        enabled = true;
    }

    private void OnBecameInvisible()
    {
        // We stop the enemy when is not visible or else
        // it might continue to run but whoen be able to change direction
        Idle();
        enabled = false;
    }
}