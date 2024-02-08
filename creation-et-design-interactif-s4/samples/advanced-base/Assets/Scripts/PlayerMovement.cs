using System;
using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour
{
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
    [SerializeField, Tooltip("How high the player will jump")]
    private float jumpForce;

    private bool isLandingFast = false;

    [Header("Events"), SerializeField]
    private CameraShakeEventChannel onLandingFastSO;
    [SerializeField]
    private ShakeTypeVariable landingFastShakeInfo;
    [SerializeField]
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
        moveDirectionX = Input.GetAxis("Horizontal");

        if (isGrounded && !Input.GetButton("Jump"))
        {
            jumpCount = 0;
        }

        if (Input.GetButtonDown("Jump") && (isGrounded || jumpCount < nbMaxJumpsAllowed))
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

        if (isLandingFast && isGrounded)
        {
            LandingImpact();
        }

        Flip();
        Animations();
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

        Move();
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

    private bool IsFloatingGrounded()
    {
        return Physics2D.OverlapCircle(
            groundCheck.position,
            bc.bounds.size.x / 2 * 0.8f,
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
            Gizmos.DrawWireSphere(groundCheck.position, bc.bounds.size.x / 2 * 0.8f);
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
