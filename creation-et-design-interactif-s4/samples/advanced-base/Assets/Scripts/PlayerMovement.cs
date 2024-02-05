using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody2D rb;
    public BoxCollider2D bc;

    private float moveDirectionX;
    private bool isGamePaused = false;

    private bool isFacingRight = true;

    public bool isOnFallingPlatform = false;

    [Tooltip("Position checks")]
    public LayerMask listGroundLayers;
    public Transform groundCheck;

    public bool isWallSliding = false;
    public bool isGrounded = false;
    public Animator animator;

    [Tooltip("Running system")]
    public float moveSpeed;

    [Header("Jump system"), ReadOnlyInspector]
    public int jumpCount = 0;
    public int maxJumpCount;
    public float jumpForce;

    public float fallThreshold = -15f;

    private bool isLandingFast = false;

    [Header("Event")]
    public CameraShakeEventChannelSO onLandingFastSO;
    public ShakeTypeVariable landingFastShakeInfo;
    public BoolEventChannelSO onTogglePauseEvent;
    public VoidEventChannel onPassThroughPlatforms;

    [Header("Debug")]
    public VectorEventChannel onDebugTeleportEvent;

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
        moveDirectionX = Input.GetAxis("Horizontal");

        if (isGrounded && !Input.GetButton("Jump"))
        {
            jumpCount = 0;
        }

        if (Input.GetButtonDown("Jump") && (isGrounded || jumpCount < maxJumpCount))
        {
            Jump(false);
        }

        if (Input.GetButtonUp("Jump") && rb.velocity.y > 0f)
        {
            Jump(true);
        }

        if (Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S))
        {
            if (isGrounded)
            {
                onPassThroughPlatforms.Raise();
            }
            else
            {
                isLandingFast = true;
                rb.velocity = new Vector2(rb.velocity.x, -jumpForce);
            }
        }

        if (isLandingFast && isGrounded)
        {
            LandingImpact();
        }

        Flip();
        Animations();
    }

    private void FixedUpdate()
    {
        isGrounded = IsGrounded();
        WallSlide();

        Move();
    }

    private void WallSlide()
    {
        if (IsWalled() && !isGrounded)
        {
            isWallSliding = true;
            rb.velocity = new Vector2(rb.velocity.x, Mathf.Clamp(rb.velocity.y, -1.5f, float.MaxValue));
        } else {
            isWallSliding = false;
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
        animator.SetBool("IsWallSliding", isWallSliding);
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
            bc.bounds.size.x / 2 * 0.8f,
            listGroundLayers
        );
    }

    private bool IsWalled()
    {
        float offset = 0.15f + (bc.bounds.size.x / 2);
        Vector2 startCast = new Vector2(bc.bounds.center.x, bc.bounds.center.y);
        Vector2 endCast = new Vector2(bc.bounds.center.x + (transform.right.normalized.x * offset), bc.bounds.center.y);

        return Physics2D.Linecast(
            startCast,
            endCast,
            listGroundLayers
        );
    }


    public bool IsFalling()
    {
        return rb.velocity.y < fallThreshold;
    }

    void OnDrawGizmos()
    {
        if (groundCheck != null)
        {
            Gizmos.color = Color.black;
            Gizmos.DrawWireSphere(groundCheck.position, bc.bounds.size.x / 2 * 0.8f);
        }

        if (bc != null)
        {
            Gizmos.color = Color.magenta;
            float offset = 0.15f + (bc.bounds.size.x / 2);

            Gizmos.DrawLine(
                new Vector2(bc.bounds.center.x, bc.bounds.center.y),
                new Vector2(bc.bounds.center.x + (transform.right.normalized.x * offset), bc.bounds.center.y)
            );
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
        transform.position = newPos;
    }

    private void OnDisable()
    {
        onTogglePauseEvent.OnEventRaised -= OnPauseEvent;
        onDebugTeleportEvent.OnEventRaised -= OnDebugTeleport;
    }
}
