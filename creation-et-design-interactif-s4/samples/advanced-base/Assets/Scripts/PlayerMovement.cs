using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody2D rb;

    private float moveDirectionX;
    private bool isGamePaused = false;

    private bool isFacingRight = true;

    public bool isOnFallingPlatform = false;

    [Tooltip("Position checks")]
    public LayerMask listGroundLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    private bool isGrounded;
    public Animator animator;

    [Tooltip("Running system")]
    public float moveSpeed;

    [Header("Jump system"), ReadOnlyInspector]
    public int jumpCount = 0;
    public int maxJumpCount;
    public float jumpForce;

    public float fallThreshold = -15f;

    private bool isLandingFast = false;

    public BoxCollider2D bc;

    [Header("Event")]
    public CameraShakeEventChannelSO onLandingFastSO;
    public ShakeTypeVariable landingFastShakeInfo;
    public BoolEventChannelSO onTogglePauseEvent;
    public VoidEventChannel onPassThroughPlatforms;

    [Header("Debug")]
    public VectorEventChannel onDebugTeleportEvent;

    [Header("Crush detection")]
    public LayerMask listContacts;
    public bool hasTopBottomCrushContact;
    public bool hasLeftRightCrushContact;

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

        if (IsGrounded() && !Input.GetButton("Jump"))
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

        if (Input.GetKeyDown(KeyCode.DownArrow))
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

        Move();

        hasTopBottomCrushContact = HasTopAndBottomContact().Length == 2;
        hasLeftRightCrushContact = HasLeftAndRightContact().Length == 2;
    }

    public RaycastHit2D[] HasTopAndBottomContact()
    {
        return Physics2D.LinecastAll(
            new Vector2(bc.bounds.center.x, bc.bounds.min.y - 0.15f),
            new Vector2(bc.bounds.center.x, bc.bounds.max.y + 0.15f),
            listContacts
        );
    }

    public RaycastHit2D[] HasLeftAndRightContact()
    {
        return Physics2D.LinecastAll(
            new Vector2(bc.bounds.min.x - 0.15f, bc.bounds.center.y),
            new Vector2(bc.bounds.max.x + 0.15f, bc.bounds.center.y),
            listContacts
        );
    }

    private void Move()
    {
        rb.velocity = new Vector2(moveDirectionX * moveSpeed, rb.velocity.y);
    }

    private void Animations()
    {
        animator.SetFloat("MoveDirectionX", Mathf.Abs(moveDirectionX));
        animator.SetFloat("MoveDirectionY", rb.velocity.y);
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

    private void Jump(bool shortJump = false)
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
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listGroundLayers);
    }

    public bool IsFalling()
    {
        return rb.velocity.y < fallThreshold;
    }

    void OnDrawGizmos()
    {
        if (groundCheck != null)
        {
            Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
        }

        if(bc != null) {
            Gizmos.color = Color.red;
            Gizmos.DrawLine(
                new Vector2(bc.bounds.min.x - 0.15f, bc.bounds.center.y),
                new Vector2(bc.bounds.max.x + 0.15f, bc.bounds.center.y)
            );
            Gizmos.color = Color.magenta;
            Gizmos.DrawLine(
                new Vector2(bc.bounds.center.x, bc.bounds.min.y - 0.15f),
                new Vector2(bc.bounds.center.x, bc.bounds.max.y + 0.15f)
            );

            //  Gizmos.DrawLine(
            //     new Vector2(xOffset, bc.bounds.center.y),
            //     new Vector2(xOffset + (transform.right.x * 0.2f), bc.bounds.center.y)
            // );
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
