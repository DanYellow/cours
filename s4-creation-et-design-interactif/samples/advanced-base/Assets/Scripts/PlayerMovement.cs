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

    [SerializeField]
    private Animator animator;


    [Tooltip("Running system"), SerializeField, Range(5, 30)]
    private float moveSpeed = 10;
    [SerializeField] private float accel = 80f;
    [SerializeField] private float decel = 70f;
    [SerializeField] private float turnAccel = 120f;

    private float velocityX;
    public bool isStunned = false;

    [Header("Position"), SerializeField]
    private bool isGrounded = false;
    public bool isOnOneWayPlatform = false;

    private bool wasGrounded;

    public bool isOnFallingPlatform = false;

    [SerializeField]
    private LayerMask listGroundLayers;
    [SerializeField]
    private Transform groundCheck;

    [SerializeField]
    private LayerMask listFloatingPlatformsLayers;

    public bool hasCrossedFloatingPlatforms;
    private float offsetFloatingPlaformsLayer = 0.2f;

    public PlayerContacts playerContacts;
    private PlatformEffector2D platformEffector;

    [Header("Jump system"), ReadOnlyInspector]
    public int jumpCount = 0;
    [SerializeField]
    private int nbMaxJumpsAllowed = 2;
    private float groundCheckRadius = 0.95f;
    [SerializeField, Tooltip("How high the player will jump")]
    private float jumpForce;

    private bool jumpReleased = false;

    [SerializeField]
    private float fallMultiplier = 2.5f;
    [SerializeField]
    private float lowJumpMultiplier = 2f;

    private bool isLandingFast = false;

    private float coyoteTime = 0.2f;
    private float coyoteTimeCounter;

    private float jumpBufferTime = 0.2f;
    private float jumpBufferCounter;

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

        if (isGrounded)
        {
            coyoteTimeCounter = coyoteTime;
        }
        else
        {
            coyoteTimeCounter -= Time.deltaTime;
        }

        Flip();
        Animations();

        if (isGrounded && !wasGrounded)
        {
            jumpCount = 0;
        }

        wasGrounded = isGrounded;
    }

    private void Controls()
    {
        moveDirectionX = Input.GetAxis("Horizontal");

        if (Input.GetButtonDown("Jump"))
        {
            jumpBufferCounter = jumpBufferTime;
        }
        else
        {
            jumpBufferCounter -= Time.deltaTime;
        }

        if (Input.GetButtonUp("Jump"))
        {
            jumpReleased = true;
        }

        if (Input.GetKeyDown(KeyCode.DownArrow) || Input.GetKeyDown(KeyCode.S))
        {
            if (isOnOneWayPlatform && !hasCrossedFloatingPlatforms)
            {
                StartCoroutine(CrossFloatingPlatforms());
            }

            if (!isOnOneWayPlatform && !isGrounded)
            {
                isLandingFast = true;
                rb.linearVelocity = new Vector2(rb.linearVelocity.x, -jumpForce);
            }
        }
    }

    public void ResetCoyoteTime()
    {
        jumpCount = 0;
        coyoteTimeCounter = coyoteTime;
        jumpBufferCounter = jumpBufferTime;
    }

    private IEnumerator CrossFloatingPlatforms()
    {
        platformEffector = playerContacts.GetTilePlatformEffector(listFloatingPlatformsLayers);
        platformEffector.colliderMask &= ~(1 << gameObject.layer);
        yield return new WaitUntil(() => hasCrossedFloatingPlatforms);
        platformEffector.colliderMask |= 1 << gameObject.layer;
    }

    private void FixedUpdate()
    {
        isGrounded = IsGrounded();
        isOnOneWayPlatform = IsOnOneWayPlatform();
        hasCrossedFloatingPlatforms = HasCrossedFloatingPlatforms();

        if (!isStunned)
        {
            Move();
        }

        if (jumpBufferCounter > 0f)
        {
            if (coyoteTimeCounter > 0f)
            {
                Jump();
                coyoteTimeCounter = 0f;
            }
            else if (jumpCount < nbMaxJumpsAllowed)
            {
                Jump();
            }
        }

        if (jumpReleased && rb.linearVelocityY > 0f)
        {
            Jump(true);
        }

        jumpReleased = false;

        if (rb.linearVelocityY < 0)
        {
            rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (fallMultiplier - 1) * Time.fixedDeltaTime;
        }
        else if (rb.linearVelocityY > 0 && !Input.GetButton("Jump"))
        {
            rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (lowJumpMultiplier - 1) * Time.fixedDeltaTime;
        }
    }

    private void Move()
    {
        float input = moveDirectionX;

        if (input != 0)
        {
            // Accélération rapide si on change de direction
            float currentAccel = Mathf.Sign(velocityX) != Mathf.Sign(moveDirectionX)
                ? turnAccel
                : accel;

            velocityX = Mathf.MoveTowards(
                velocityX,
                moveDirectionX * moveSpeed,
                currentAccel * Time.fixedDeltaTime
            );
        }
        else
        {
            // Décéleration rapide
            velocityX = Mathf.MoveTowards(
                velocityX,
                0,
                decel * Time.fixedDeltaTime
            );
        }

        rb.linearVelocity = new Vector2(velocityX, rb.linearVelocityY);
    }

    private void Animations()
    {
        animator.SetFloat("VelocityX", Mathf.Abs(rb.linearVelocity.x));
        animator.SetFloat("VelocityY", rb.linearVelocity.y);
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

        if (shortJump)
        {
            rb.linearVelocity = new Vector2(
                rb.linearVelocityX,
                rb.linearVelocityY * 0.25f
            );
            coyoteTimeCounter = 0f;
        }
        else
        {
            jumpCount++;
            rb.linearVelocity = new Vector2(rb.linearVelocityX, jumpForce);
            jumpBufferCounter = 0f;
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

    private bool IsOnOneWayPlatform()
    {
        return Physics2D.OverlapCircle(
            groundCheck.position,
            bc.bounds.size.x / 2 * groundCheckRadius,
            listFloatingPlatformsLayers
        );
    }

    private bool HasCrossedFloatingPlatforms()
    {
        Collider2D hitFloatingPlatformsLayer = Physics2D.OverlapBox(
            new Vector2(bc.bounds.center.x, bc.bounds.max.y + offsetFloatingPlaformsLayer),
            new Vector2(bc.size.x, 0.05f),
            0,
            listFloatingPlatformsLayers
        );

        return hitFloatingPlatformsLayer != null;
    }

    public bool IsFalling()
    {
        return rb.linearVelocity.y <= -jumpForce;
    }

    void OnDrawGizmos()
    {
        if (groundCheck != null)
        {
            Gizmos.color = Color.black;
            Gizmos.DrawWireSphere(groundCheck.position, bc.bounds.size.x / 2 * groundCheckRadius);
        }

        if (bc != null)
        {
            Gizmos.color = Color.red;
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x, bc.bounds.max.y + offsetFloatingPlaformsLayer),
                new Vector2(bc.size.x, 0.05f)
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
        GetComponent<Knockback>().Apply(Vector2.zero, 0);
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
