using UnityEngine;

public class EnemyJumpAttack : MonoBehaviour
{
    public EnemyPatrol enemyPatrol;
    public Rigidbody2D rb;
    public float jumpHeight;
    public LayerMask targetLayer;

    public Transform targetDebug;
    private Collider2D target;
    public Vector2 lineOfSite;
    public Vector2 lineOfSiteOffset;
    // public bool isFacingRight = false;

    private int lineOfSiteOffsetFactor = 1;

    [Tooltip("Position checks")]
    public LayerMask listGroundLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    private bool isGrounded;
    private bool isAttacking = false;

    // Start is called before the first frame update
    void Awake()
    {

    }

    private void Update()
    {
        if (enemyPatrol)
        {
            lineOfSiteOffsetFactor = (enemyPatrol.isFacingRight) ? 1 : -1;
        }

        if (Input.GetKeyDown(KeyCode.P))
        {
            JumpAttack(targetDebug);
        }

        if(target && isGrounded && !isAttacking) {
            JumpAttack(target.gameObject.transform);
        }
        isAttacking = (isAttacking && !target); 
        enemyPatrol.enabled = !isAttacking;

        if(
            target && 
            (
                (target.gameObject.transform.position.x - transform.position.x < 0  && !enemyPatrol.isFacingRight)  ||
                (target.gameObject.transform.position.x - transform.position.x > 0 && enemyPatrol.isFacingRight)
            )
        ) {
             Debug.Log("target " + target);
            enemyPatrol.Flip();
        }

        // Debug.Log("target && isGrounded && !isAttacking " + (target && isGrounded && !isAttacking));
        // Debug.Log("target " + target);
        // Debug.Log("isAttacking " + !isAttacking);
        // Debug.Log("isGrounded " + isGrounded);
    }

    // Update is called once per frame
    private void FixedUpdate()
    {
        isGrounded = IsGrounded();

        target = Physics2D.OverlapBox(transform.position + (Vector3)lineOfSiteOffset * lineOfSiteOffsetFactor, lineOfSite, 0, targetLayer);
    }



    void JumpAttack(Transform player)
    {
        isAttacking = true;
        // float distanceFromTarget = player.position.x - transform.position.x;
        //     rb.velocity = new Vector2(distanceFromTarget, rb.velocity.y);
        // Debug.Log("distanceFromTarget " + distanceFromTarget);
            // rb.AddForce(new Vector2(distanceFromTarget, jumpHeight), ForceMode2D.Impulse);
    }

    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawWireCube(transform.position + (Vector3)lineOfSiteOffset * lineOfSiteOffsetFactor, lineOfSite);

        Gizmos.color = Color.magenta;
        Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listGroundLayers);
    }
}
