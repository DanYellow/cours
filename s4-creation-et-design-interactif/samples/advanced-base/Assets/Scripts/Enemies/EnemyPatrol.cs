
using UnityEngine;
using System.Collections;

enum EnemyState
{
    Idle,
    Moving
}

public class EnemyPatrol : MonoBehaviour
{
    public Rigidbody2D rb;
    public Animator animator;

    [Header("Movement management")]
    public float speed = 0.5f;
    private EnemyState currentState;

    private float idleTime;

    [Tooltip("Define how long the enemy will move")]
    public float moveDuration = 5f;

    private WaitForSeconds waitMoveDuration;
    private WaitForSeconds waitIdleTime;
    [Tooltip("If false, the enemy will move endlessly back and forth")]
    public bool canWait = true;

    [Header("Collision detection")]
    public LayerMask obstacleLayersMask;
    public float obstacleDetectionLength = 0.15f;
    public BoxCollider2D bc;
    [UnityEngine.Serialization.FormerlySerializedAs("groundCheckRadius")]
    public float obstacleCheckRadius = 0.25f;

    [SerializeField]
    private bool isSpriteFacingRight = true;

    // https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members
    private float facingDirection
    {
        get
        {
            return Mathf.Sign(transform.localScale.x) * (isSpriteFacingRight ? 1 : -1);
        }
    }

    private void Awake()
    {
        // We don't want the script to be enabled by default
        enabled = false;

        if (canWait)
        {
            idleTime = Mathf.Round(moveDuration / 2.5f);

            waitMoveDuration = new WaitForSeconds(moveDuration);
            waitIdleTime = new WaitForSeconds(idleTime);

            StartCoroutine(ChangeState());
        }
    }

    private void Update()
    {
        animator.SetFloat("VelocityX", Mathf.Abs(rb.linearVelocity.x));
    }

    private void FixedUpdate()
    {
        if (HasCollisionWithObstacle() || HasNotTouchedGround())
        {
            Flip();
        }

        if (currentState == EnemyState.Idle)
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
            currentState = EnemyState.Idle;
            yield return waitMoveDuration;

            // ...then wait during X seconds...
            currentState = EnemyState.Moving;
            yield return waitIdleTime;
        }
    }

    private void Idle()
    {
        rb.linearVelocity = Vector2.zero;
    }

    private void Move()
    {
        rb.linearVelocity = new Vector2(speed * facingDirection, rb.linearVelocity.y);
    }

    public bool HasCollisionWithObstacle()
    {
        Vector2 startCast = new Vector2(
            bc.bounds.center.x + (facingDirection * bc.bounds.extents.x),
            bc.bounds.center.y
        );
        Vector2 endCast = new Vector2(startCast.x + facingDirection * obstacleDetectionLength, startCast.y);

        RaycastHit2D hitObstacle = Physics2D.Linecast(startCast, endCast, obstacleLayersMask);

        return hitObstacle.collider != null;
    }

    public bool HasNotTouchedGround()
    {
        Vector2 center = new Vector2(
            bc.bounds.center.x + (facingDirection * bc.bounds.extents.x),
            bc.bounds.min.y
        );

        return !Physics2D.OverlapCircle(center, obstacleCheckRadius, obstacleLayersMask);
    }

    void OnDrawGizmos()
    {
        if (bc == null) return;

        Gizmos.color = Color.yellow;
        Gizmos.DrawWireSphere(
            new Vector2(
                bc.bounds.center.x + (facingDirection * bc.bounds.extents.x),
                bc.bounds.min.y
            ),
            obstacleCheckRadius
        );

        Gizmos.color = Color.green;
        Vector2 startCast = new Vector2(
            bc.bounds.center.x + (facingDirection * bc.bounds.extents.x),
            bc.bounds.center.y
        );
        Gizmos.DrawLine(
            startCast,
            new Vector2(startCast.x + facingDirection * obstacleDetectionLength, startCast.y)
        );
    }

    public void Flip()
    {
        Vector3 localScale = transform.localScale;
        localScale.x *= -1f;
        transform.localScale = localScale;
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

    void OnDisable()
    {
        StopAllCoroutines();
    }
}
