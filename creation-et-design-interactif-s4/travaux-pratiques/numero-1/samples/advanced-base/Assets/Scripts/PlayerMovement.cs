using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody2D rb;

    private float moveDirectionX;

    public bool isFacingRight = true;

    [Tooltip("Position checks")]
    public LayerMask listGroundLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    private bool isGrounded;
    public Animator animator;

    [Tooltip("Running system")]
    private bool isRunningFast;
    public float runFastSpeedFactor;
    public float moveSpeed;
    [Tooltip("How fast the player will reach the max speed")]
    public float moveDirectionXSpeedFactor = 1.15f;

    public TrailRenderer trailRenderer;
    public ParticleSystem particles;

    [Header("Jump system"), ReadOnlyInspector]
    public int jumpCount = 0;
    public int maxJumpCount;
    public float jumpForce;

    private bool isLandingFast = false;
    public ParticleSystem landingParticles;

    [Header("Misc")]
    public CameraShakeEventChannelSO onLandingFastSO;
    public ShakeTypeVariable landingFastShakeInfo;

    private Vector2 currentVelocity;
    private float maxYVelocity;

    [Header("Ice")]
    private bool isOnIce = false;
    private bool wasOnIce = false;

    private void Awake()
    {
        enabled = false;
        trailRenderer.enabled = false;
        maxYVelocity = (jumpForce * 0.25f) + jumpForce;
    }

    public void Activate()
    {
        enabled = true;
    }

    // Update is called once per frame
    void Update()
    {
        moveDirectionX = Mathf.Clamp(Input.GetAxis("Horizontal") * moveDirectionXSpeedFactor, -1, 1);
        isRunningFast = Input.GetKey(KeyCode.V);

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

        if (Input.GetKeyDown(KeyCode.DownArrow) && !isGrounded)
        {
            isLandingFast = true;
            rb.velocity = new Vector2(rb.velocity.x, -jumpForce);
        }

        if (isLandingFast && isGrounded)
        {
            LandingImpact();
        }

        trailRenderer.enabled = isRunningFast;

        Flip();
    }

    private void FixedUpdate()
    {
        Animations();
        LimitSpeed();
        isGrounded = IsGrounded();

        if (isOnIce)
        {
            float frictionIceFactor = (isOnIce) ? 3 : 6;
            Vector2 direction = new Vector2(moveDirectionX, rb.velocity.y) * (moveSpeed / frictionIceFactor);
            rb.AddForce(direction, ForceMode2D.Force);
        }
        else
        {
            if (!wasOnIce)
            {
                Move();
            }
        }

        MoveFast();
    }

    private void LimitSpeed()
    {
        currentVelocity = rb.velocity;
        currentVelocity.y = Mathf.Clamp(currentVelocity.y, rb.velocity.y, maxYVelocity);
        currentVelocity.x = Mathf.Clamp(currentVelocity.x, -moveSpeed, moveSpeed);

        rb.velocity = currentVelocity;
    }

    private void Move()
    {
        rb.velocity = new Vector2((moveDirectionX * moveSpeed), rb.velocity.y);
    }

    private void MoveFast() {
        if (isRunningFast)
        {
            Vector2 v = rb.velocity;
            v.x *= runFastSpeedFactor;
            rb.velocity = v;
        }
    }

    private void Animations()
    {
        animator.SetFloat("MoveDirectionX", Mathf.Abs(moveDirectionX));
        animator.SetFloat("MoveDirectionY", rb.velocity.y);
        animator.SetBool("IsGrounded", isGrounded);
    }

    private void Flip()
    {
        if (moveDirectionX > 0 && !isFacingRight || moveDirectionX < 0 && isFacingRight)
        {
            CreateDust();
            isFacingRight = !isFacingRight;
            transform.Rotate(0f, 180f, 0f);
        }
    }

    private void Jump(bool shortJump = false)
    {
        float jumpPower = (shortJump ? rb.velocity.y * 0.5f : jumpForce);
        rb.velocity = new Vector2(rb.velocity.x, jumpPower);

        if (!shortJump)
        {
            jumpCount = jumpCount + 1;
        }

        if (jumpCount > 1)
        {
            animator.SetTrigger("DoubleJump");
        }
        CreateDust();
    }

    public bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listGroundLayers);
    }

    public bool IsGoingUp() {
        return rb.velocity.y > 0f;
    }

    void OnDrawGizmosSelected()
    {
        if (groundCheck != null)
        {
            Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
        }
    }

    public void ToggleState(bool state)
    {
        enabled = !state;
    }

    private void CreateDust()
    {
        particles.Play();
    }

    private void LandingImpact()
    {
        isLandingFast = false;
        onLandingFastSO.Raise(landingFastShakeInfo);
        landingParticles.Play();
        rb.velocity = Vector2.zero;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.layer == LayerMask.NameToLayer("Ice"))
        {
            isOnIce = true;
            wasOnIce = true;
        }
        else if (other.gameObject.layer != LayerMask.NameToLayer("Ice"))
        {
            wasOnIce = false;
        }
    }

    private void OnCollisionExit2D(Collision2D other)
    {
        if (other.gameObject.layer == LayerMask.NameToLayer("Ice"))
        {
            isOnIce = false;
        }
    }
}
