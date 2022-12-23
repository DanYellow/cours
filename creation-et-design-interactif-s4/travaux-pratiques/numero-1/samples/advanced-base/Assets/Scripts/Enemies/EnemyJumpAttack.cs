using UnityEngine;
using System.Collections.Generic;

public class EnemyJumpAttack : MonoBehaviour
{
    public EnemyPatrol enemyPatrol;
    public Animator animator;
    public Rigidbody2D rb;
    public float jumpHeight;
    public LayerMask targetLayer;

    public Transform targetDebug;
    private Collider2D target;
    public Vector2 lineOfSite;
    public Vector2 lineOfSiteOffset;
    public float delayBeforeJump = 0.75f;

    private int lineOfSiteOffsetFactor = 1;

    [Tooltip("Position checks")]
    public LayerMask listGroundLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    private bool isGrounded;
    public bool canAttack = true;

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

        if (target && isGrounded && canAttack)
        {
            JumpAttack(target.gameObject.transform);
        }

        if(!canAttack && isGrounded) {
            canAttack = true;
        }

        enemyPatrol.enabled = (!target && isGrounded);

        if (
            target &&
            (
                (target.gameObject.transform.position.x - transform.position.x < 0 && enemyPatrol.isFacingRight) ||
                (target.gameObject.transform.position.x - transform.position.x > 0 && !enemyPatrol.isFacingRight)
            )
        )
        {
            enemyPatrol.Flip();
        }

        animator.SetFloat("MoveDirectionY", rb.velocity.y);
    }

    // Update is called once per frame
    private void FixedUpdate()
    {
        isGrounded = IsGrounded();

        // + (Vector3)lineOfSiteOffset * lineOfSiteOffsetFactor
        target = Physics2D.OverlapBox(transform.position, lineOfSite, 0, targetLayer);
    }

    void JumpAttack(Transform player)
    {
        // Debug.Log("JumpAttack ");
        float distanceFromTarget = player.position.x - transform.position.x;
        // rb.velocity = new Vector2(distanceFromTarget, jumpHeight);
        // Debug.Log("distanceFromTarget " + distanceFromTarget);
        rb.AddForce(new Vector2(distanceFromTarget, jumpHeight), ForceMode2D.Impulse);
        rb.velocity = Vector3.ClampMagnitude(rb.velocity, jumpHeight);
        // rb.velocity = new Vector2(rb.velocity.x, Mathf.Clamp(rb.velocity.y, 0f, jumpHeight));
        canAttack = false;
    }

    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.red;
        //  + (Vector3)lineOfSiteOffset * lineOfSiteOffsetFactor
        Gizmos.DrawWireCube(transform.position, lineOfSite);

        Gizmos.color = Color.magenta;
        Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listGroundLayers);
    }
}
