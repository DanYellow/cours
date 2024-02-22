using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour
{
    // init position : 0.36 -0.1
    [SerializeField]
    private Rigidbody2D rb;
    [SerializeField]
    private BoxCollider2D bc;

    private float moveDirectionX;
    private bool isGamePaused = false;

    private bool isFacingRight = true;

    public bool isOnFallingPlatform = false;

    [Tooltip("Position checks"), SerializeField]
    private LayerMask listGroundLayers;
    [SerializeField]
    private Transform groundCheck;

    [SerializeField]
    private LayerMask listFloatingPlatformsLayers;

    public bool isGrounded = false;
    public bool isFloatingGrounded = false;
    [SerializeField]
    private Animator animator;

    [Tooltip("Running system"), SerializeField]
    private float moveSpeed;

    [Header("Jump system"), ReadOnlyInspector]
    public int jumpCount = 0;
    [SerializeField]
    private int nbMaxJumpsAllowed = 2;
    private float groundCheckRadius = 0.95f;
    [SerializeField, Tooltip("How high the player will jump")]
    private float jumpForce;
    private bool isJumping = false;

    private bool isLandingFast = false;

    public bool isStunned = false;

    [Header("Broadcast event channels"), SerializeField]
    private CameraShakeEventChannel onLandingFastSO;
    [SerializeField]
    private ShakeTypeVariable landingFastShakeInfo;
    [SerializeField, Header("Listen to event channels")]
    private BoolEventChannel onTogglePauseEvent;

    [Header("Debug"), SerializeField]
    private VectorEventChannel onDebugTeleportEvent;

    private void OnEnable()
    {
        onTogglePauseEvent.OnEventRaised += OnPauseEvent;
        onDebugTeleportEvent.OnEventRaised += OnDebugTeleport;
    }

    private void OnPauseEvent(bool value)
    {
        isGamePaused = value;
    }

    void Update()
    {
        if (isGamePaused)
        {
            return;
        }

        if (!isStunned)
        {
            Controls();
        }

        if (isLandingFast && isGrounded)
        {
            LandingImpact();
        }

        Flip();
        Animations();
    }

    private void Controls()
    {
        moveDirectionX = Input.GetAxis("Horizontal");

        if (isGrounded && !Input.GetButton("Jump"))
        {
            jumpCount = 0;
            isJumping = false;
        }

        if (Input.GetButtonDown("Jump") && (isGrounded || isJumping && jumpCount < nbMaxJumpsAllowed))
        {
            Jump(false);
        }

        if (Input.GetButtonUp("Jump") && rb.velocity.y > 0f)
        {
            Jump(true);
        }

        if (Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S))
        {
            if (isFloatingGrounded)
            {
                StartCoroutine(PassThroughPlatforms());
            }

            if (!isFloatingGrounded && !isGrounded)
            {
                isLandingFast = true;
                rb.velocity = new Vector2(rb.velocity.x, -jumpForce);
            }
        }
    }

    private IEnumerator PassThroughPlatforms()
    {
        bc.enabled = false;
        yield return new WaitForSeconds(0.25f);
        bc.enabled = true;
    }

    private void FixedUpdate()
    {
        isGrounded = IsGrounded();
        isFloatingGrounded = IsFloatingGrounded();

        if (!isStunned)
        {
            Move();
        }
    }

    private void Move()
    {
        rb.velocity = new Vector2(moveDirectionX * moveSpeed, rb.velocity.y);
    }

    private void Animations()
    {
        animator.SetFloat("VelocityX", Mathf.Abs(moveDirectionX));
        animator.SetFloat("VelocityY", rb.velocity.y);
        animator.SetBool("IsOnFallingPlatform", isOnFallingPlatform);
        animator.SetBool("IsGrounded", isGrounded);
    }

    private void Flip()
    {
        if (moveDirectionX > 0 && !isFacingRight || moveDirectionX < 0 && isFacingRight)
        {
            isFacingRight = !isFacingRight;
            transform.Rotate(0f, 180f, 0f);
        }
    }

    public void Jump(bool shortJump = false)
    {
        float jumpPower = shortJump ? rb.velocity.y * 0.5f : jumpForce;
        rb.velocity = new Vector2(rb.velocity.x, jumpPower);

        if (!shortJump)
        {
            jumpCount++;
            isJumping = true;

            if (jumpCount > 1)
            {
                animator.SetTrigger("DoubleJump");
            }
        }
    }

    public bool IsGrounded()
    {
        return Physics2D.OverlapCircle(
            groundCheck.position,
            bc.bounds.size.x / 2 * groundCheckRadius,
            listGroundLayers
        );
    }

    private bool IsFloatingGrounded()
    {
        return Physics2D.OverlapCircle(
            groundCheck.position,
            bc.bounds.size.x / 2 * groundCheckRadius,
            listFloatingPlatformsLayers
        );
    }

    public bool IsFalling()
    {
        return rb.velocity.y <= -jumpForce;
    }

    void OnDrawGizmos()
    {
        if (groundCheck != null)
        {
            Gizmos.color = Color.black;
            Gizmos.DrawWireSphere(groundCheck.position, bc.bounds.size.x / 2 * groundCheckRadius);
        }
    }

    public void ToggleState(bool state)
    {
        enabled = !state;
    }

    private void LandingImpact()
    {
        isLandingFast = false;
        onLandingFastSO.Raise(landingFastShakeInfo);
    }

    private void OnDebugTeleport(Vector3 newPos)
    {
#if UNITY_EDITOR
        transform.position = newPos;
#endif
    }

    private void OnDisable()
    {
        onTogglePauseEvent.OnEventRaised -= OnPauseEvent;
        onDebugTeleportEvent.OnEventRaised -= OnDebugTeleport;
    }
}
