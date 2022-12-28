using UnityEngine;
using System.Collections;

public class EnemyJumpAttack : MonoBehaviour
{
    public EnemyPatrol enemyPatrol;
    public Animator animator;
    public Rigidbody2D rb;
    public float jumpHeight;
    public LayerMask targetLayer;

    public Collider2D hitBox;

    private Collider2D target;
    public Vector2 sightArea;
    public Vector2 sightAreaOffset;
    public float delayBeforeJump = 0.75f;

    private int moveDirection = 1;

    [Tooltip("Position checks")]
    public LayerMask listGroundLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    private ContactPoint2D[] contacts = new ContactPoint2D[1];

    private GameObject lastHit;
    private Vector3 sightOffset = Vector3.zero;

    private bool isGrounded;
    public bool canAttack = true;

    private void Update()
    {
        if (enemyPatrol != null)
        {
            moveDirection = (enemyPatrol.isFacingRight == true) ? 1 : -1;
        }

        sightOffset = ((Vector3)sightAreaOffset * moveDirection);

        if (Input.GetKeyDown(KeyCode.P))
        {
            if (!enemyPatrol.enabled && canAttack && target != null)
            {
                StartCoroutine(JumpAttack(target.gameObject.transform));

            }
        }

        enemyPatrol.enabled = (!target && isGrounded && GetComponent<Renderer>().isVisible);

        if (
            target != null &&
            (
                (target.gameObject.transform.position.x - transform.position.x < 0 && enemyPatrol.isFacingRight) ||
                (target.gameObject.transform.position.x - transform.position.x > 0 && !enemyPatrol.isFacingRight)
            )
        )
        {
            enemyPatrol.Flip();
        }

        animator.SetFloat("MoveDirectionX", rb.velocity.x);
        animator.SetFloat("MoveDirectionY", rb.velocity.y);
    }

    private void FixedUpdate()
    {
        isGrounded = IsGrounded();
        target = Physics2D.OverlapBox(transform.position + sightOffset, sightArea, 0, targetLayer);

        if (!enemyPatrol.enabled && canAttack && target != null && isGrounded && rb.velocity.y == 0)
        {
            canAttack = false;
            StartCoroutine(JumpAttack(target.gameObject.transform));
        }
    }

    IEnumerator JumpAttack(Transform target)
    {
        yield return new WaitForSeconds(delayBeforeJump);
        float distanceFromTarget = target.position.x - transform.position.x;
        rb.AddForce(new Vector2(distanceFromTarget, jumpHeight) * rb.mass, ForceMode2D.Impulse);
        
        // yield return new WaitForSeconds(delayBeforeJump);
        // canAttack = true;

        // yield return new WaitForSeconds(delayBeforeJump);
        // float distanceFromTarget = player.position.x - transform.position.x;
        // Debug.Log(new Vector2(distanceFromTarget, jumpHeight) * rb.mass);

        // gameObject.transform.position = new Vector3(
        //     player.position.x,
        //      transform.position.y,
        //       transform.position.z
        // );
        // // rb.AddForce(new Vector2(distanceFromTarget, jumpHeight) * rb.mass, ForceMode2D.Impulse);
        // // rb.velocity = new Vector2(distanceFromTarget, jumpHeight);
        // // rb.velocity = Vector3.ClampMagnitude(rb.velocity, jumpHeight);
        // // Debug.Log("dddd " + Vector3.ClampMagnitude(rb.velocity, jumpHeight));
        // // Debug.Log("jumpHeight " + jumpHeight * rb.mass);
        // // Debug.Log("rb.mass " + rb.mass);
        lastHit = null;
    }


    private void OnDrawGizmosSelected()
    {
        Gizmos.color = Color.green;
        Gizmos.DrawWireCube(transform.position + sightOffset, sightArea);

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
        if (lastHit != other.gameObject)
        {
            lastHit = other.gameObject;
            canAttack = true;
        }

        if (
            contacts[0].normal.y > 0.5f &&
            other.gameObject.CompareTag("Player")
        )
        {
            Vector2 originVector = new Vector2(0.15f * moveDirection, 1);
            Vector2 bounceForce = originVector * jumpHeight * rb.mass;
            rb.AddForce(bounceForce, ForceMode2D.Impulse);
        }
    }
}
