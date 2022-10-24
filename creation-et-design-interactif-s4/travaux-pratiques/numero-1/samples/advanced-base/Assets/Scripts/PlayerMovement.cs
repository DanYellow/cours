
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody2D rb;

    private float moveDirectionX;
    private bool isFacingRight = true;
    public float moveSpeed;
    public float jumpForce;
    private bool isJumping = false;
    private bool isShortJump = false;

    public LayerMask listGroundLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    [SerializeField]
    bool isGrounded;

    public Animator animator;

    [ReadOnlyInspector]
    private int jumpCount = 0;
    public int maxJumpCount;

    private void Awake() {
        this.enabled = false;        
    }

    // private void Start()
    // {
    //     jumpCount = 0;
    // }

    public void Activate () {
        enabled = true;
    }

    // Update is called once per frame
    void Update()
    {
        moveDirectionX = Input.GetAxisRaw("Horizontal");

        if (Input.GetButtonDown("Jump") && jumpCount < maxJumpCount)
        {
            isJumping = true;
        }

        if (Input.GetButtonUp("Jump") && rb.velocity.y > 0f)
        {
            isShortJump = true;
        }

        isGrounded = IsGrounded();
        if (isGrounded)
        {
            jumpCount = 0;
        }
    }

    private void FixedUpdate()
    {
        Move();
    }

    private void Move()
    {
        rb.velocity = new Vector2(moveDirectionX * moveSpeed, rb.velocity.y);

        animator.SetFloat("MoveDirectionX", Mathf.Abs(moveDirectionX));
        animator.SetFloat("MoveDirectionY", rb.velocity.y);
        animator.SetBool("IsGrounded", isGrounded);

        Flip();
        if ((isJumping && isGrounded) || isShortJump)
        {
            Jump(isShortJump);
        }
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
        float jumpPower = (shortJump ? rb.velocity.y * 0.5f : jumpForce);
        if (jumpCount < maxJumpCount)
        {
            rb.velocity = new Vector2(rb.velocity.x, jumpPower);
            jumpCount = jumpCount + 1;
        }

        isJumping = false;
        isShortJump = false;
    }

    public bool IsGrounded()
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
}
