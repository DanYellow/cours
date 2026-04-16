using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody2D rb;

    private float moveDirectionX;
    private bool isFacingRight = true;
    public float moveSpeed;
    public float jumpForce;

    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    [SerializeField]
    private bool isGrounded;

    private bool wasGrounded;

    public int nbMaxJumpsAllowed = 3;
    [SerializeField]
    private int jumpCount = 0;

    private float coyoteTime = 0.2f;
    private float coyoteTimeCounter;

    private bool isWallSliding;
    private float wallSlidingSpeed = 2f;

    public Transform wallCheck;
    public LayerMask wallLayer;


    private void Start()
    {
        jumpCount = 0;
        // https://www.youtube.com/watch?v=EyKmLj2ICFw
        // val.CurrentValue = 41;
    }


    // Update is called once per frame
    void Update()
    {
        if (isGrounded)
        {
            coyoteTimeCounter = coyoteTime;
        }
        else
        {
            coyoteTimeCounter -= Time.deltaTime;
        }

        if (isGrounded && !wasGrounded)
        {
            jumpCount = 0;
        }

        Flip();

        wasGrounded = isGrounded;
    }

    // public void OnMove(InputValue val)
    // {
    //     moveDirectionX = val.Get<Vector2>().x;
    // }

    public void AddForceAtAngle(float force, float angle)
    {
        float xcomponent = Mathf.Cos(angle * Mathf.PI / 180) * force;
        float ycomponent = Mathf.Sin(angle * Mathf.PI / 180) * force;

        Vector2 vforce = new Vector2(xcomponent, ycomponent);
        rb.linearVelocity = vforce;
        // rb.AddForce(vforce, ForceMode2D.Impulse);
    }

    Vector2 VectorFromAngle(float theta)
    {
        return new Vector2(
            Mathf.Cos(theta),
            Mathf.Sin(theta)
        ); // Trig is fun
    }

    private void FixedUpdate()
    {
        isGrounded = IsGrounded();

        WallSlide();

        if (rb.linearVelocity.y < 0)
        {
            rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (2.5f - 1) * Time.fixedDeltaTime;
        }
        // else if (rb.linearVelocity.y > 0 && !Input.GetButton("Jump"))
        // {
        //     rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (2f - 1) * Time.fixedDeltaTime;
        // }
    }

    public void OnMove(InputAction.CallbackContext context)
    {
        moveDirectionX = context.ReadValue<Vector2>().x;
        rb.linearVelocity = new Vector2(moveDirectionX * moveSpeed, rb.linearVelocity.y);
    }

    public void OnJump(InputAction.CallbackContext context)
    {
        if (context.performed && (isGrounded || jumpCount < nbMaxJumpsAllowed))
        {
            Jump();
        }
        else if (context.canceled && rb.linearVelocityY > 0f)
        {
            rb.linearVelocity = new Vector2(
               rb.linearVelocity.x,
              rb.linearVelocity.y * 0.5f
           );
        }
    }

    private void Flip()
    {
        if (moveDirectionX > 0 && !isFacingRight || moveDirectionX < 0 && isFacingRight)
        {
            isFacingRight = !isFacingRight;
            Vector3 localScale = transform.localScale;
            localScale.x *= -1f;
            transform.localScale = localScale;
        }
    }

    private void Jump()
    {
        jumpCount++;
        rb.linearVelocity = new Vector2(rb.linearVelocityX, 0);
        rb.linearVelocity = new Vector2(rb.linearVelocityX, jumpForce);
    }

    public bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listCollisionLayers);
    }

    void OnDrawGizmosSelected()
    {
        if (groundCheck != null)
        {
            Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
        }
    }

    private bool IsWalled()
    {
        return Physics2D.OverlapCircle(wallCheck.position, 0.2f, wallLayer);
    }

    private void WallSlide()
    {
        if (IsWalled() && !isGrounded)
        {
            isWallSliding = true;
            rb.linearVelocity = new Vector2(rb.linearVelocity.x, Mathf.Clamp(rb.linearVelocity.y, -wallSlidingSpeed, float.MaxValue));
        }
        else
        {
            isWallSliding = false;
        }
    }

    public void ToggleState(bool state)
    {
        enabled = !state;
    }
}
