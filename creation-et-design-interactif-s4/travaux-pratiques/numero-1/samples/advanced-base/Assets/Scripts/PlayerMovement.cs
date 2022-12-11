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
    public float runFastSpeed;
    public float moveSpeed;

    public TrailRenderer trailRenderer;
    public ParticleSystem particles;

    [Header("Jump system"), ReadOnlyInspector]
    public int jumpCount = 0;
    public int maxJumpCount;
    public float jumpForce;

    private void Awake()
    {
        enabled = false;
        trailRenderer.enabled = false;
    }

    public void Activate()
    {
        enabled = true;
    }

    // Update is called once per frame
    void Update()
    {
        moveDirectionX = Input.GetAxisRaw("Horizontal");
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

        trailRenderer.enabled = isRunningFast;

        Flip();
    }

    private void FixedUpdate()
    {
        Move();
        Animations();
        isGrounded = IsGrounded();
    }

    private void Move()
    {
        rb.velocity = new Vector2(moveDirectionX * moveSpeed, rb.velocity.y);
        if (isRunningFast)
        {
            Vector2 v = rb.velocity;
            v.x *= runFastSpeed;
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

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listGroundLayers);
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

    private void CreateDust() {
        particles.Play();
    }

    public void SetIsFacingRight(bool _isFacingRight) {
        isFacingRight = _isFacingRight;
    }
}
