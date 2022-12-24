using UnityEngine;
using System.Collections;

public class EnemyJumpAttack : MonoBehaviour
{
    public EnemyPatrol enemyPatrol;
    public Animator animator;
    public Rigidbody2D rb;
    public float jumpHeight;
    public LayerMask targetLayer;

    private Collider2D target;
    public Vector2 sightArea;
    public Vector2 sightAreaOffset;
    public float delayBeforeJump = 0.75f;

    private int sightAreaOffsetFactor = 1;

    [Tooltip("Position checks")]
    public LayerMask listGroundLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    private ContactPoint2D[] contacts = new ContactPoint2D[1];

    private GameObject lastHit;

    private bool isGrounded;
    public bool canAttack = true;

    private void Update()
    {
        if (enemyPatrol)
        {
            sightAreaOffsetFactor = (enemyPatrol.isFacingRight) ? 1 : -1;
        }

        if (target && isGrounded && canAttack)
        {
            StartCoroutine(JumpAttack(target.gameObject.transform));
        }

        enemyPatrol.enabled = (!target && isGrounded && GetComponent<Renderer>().isVisible);

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

    private void FixedUpdate()
    {
        isGrounded = IsGrounded();
        target = Physics2D.OverlapBox(transform.position + (Vector3)sightAreaOffset * sightAreaOffsetFactor, sightArea, 0, targetLayer);
    }

    IEnumerator JumpAttack(Transform player)
    {
        canAttack = false;
        yield return new WaitForSeconds(delayBeforeJump);
        float distanceFromTarget = player.position.x - transform.position.x;
        rb.AddForce(new Vector2(distanceFromTarget, jumpHeight), ForceMode2D.Impulse);
        rb.velocity = Vector3.ClampMagnitude(rb.velocity, jumpHeight);
        lastHit = null;
    }


    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.red;
        Gizmos.DrawWireCube(transform.position + (Vector3)sightAreaOffset * sightAreaOffsetFactor, sightArea);

        Gizmos.color = Color.magenta;
        Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listGroundLayers);
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        other.GetContacts(contacts);
        if(lastHit != other.gameObject) {
            lastHit = other.gameObject;
            canAttack = true;
        }

        if (
            contacts[0].normal.y > 0.5f &&
            contacts[0].normal.x == 0 &&
            other.gameObject.CompareTag("Player")
        )
        {
            Vector2 bounceForce = Vector2.one * 5f;
            rb.AddForce(bounceForce, ForceMode2D.Impulse);
        }
    }
}
