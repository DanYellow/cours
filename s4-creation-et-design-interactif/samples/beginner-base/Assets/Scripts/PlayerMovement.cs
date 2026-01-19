
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

    [SerializeField]
    private float fallingThreshold = -20f;

    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    [SerializeField]
    bool isGrounded;

    bool wasGrounded;

    public bool jumpRequested = false;

    public int nbMaxJumpsAllowed = 3;
    [SerializeField]
    private int jumpCount = 0;

    public bool enabledShortJump = true;

    bool jumpHeld;

    private void Start()
    {
        jumpCount = 0;
        // https://www.youtube.com/watch?v=EyKmLj2ICFw
        // FloatVariable val = ScriptableObject.CreateInstance(type(FloatVariable));
        // FloatVariable val = ScriptableObject.CreateInstance("FloatVariable") as FloatVariable;
        // val.CurrentValue = 41;
    }


    // Update is called once per frame
    void Update()
    {
        moveDirectionX = Input.GetAxisRaw("Horizontal");

        if (Input.GetButtonDown("Jump"))
        {
            jumpRequested = true;
        }

        jumpHeld = Input.GetButton("Jump");

        if (Input.GetKeyDown(KeyCode.Alpha0))
        {
            transform.Translate(VectorFromAngle(45));
            // AddForceAtAngle(15f, 45);
        }

        Flip();
    }

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
        Move();
        isGrounded = IsGrounded();

        if (isGrounded && !wasGrounded)
        {
            jumpCount = 0;
        }
        Jump();

        wasGrounded = isGrounded;
    }

    private void Move()
    {
        // rb.linearVelocity = new Vector2(moveDirectionX * moveSpeed, rb.linearVelocity.y);

        float control = isGrounded ? 1f : 0.5f; // airControl

        if (Mathf.Abs(moveDirectionX) > 0.01f)
        {
            rb.linearVelocity = new Vector2(moveDirectionX * moveSpeed * control, rb.linearVelocity.y);
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

    private void Jump()
    {
        if (jumpRequested)
        {
            if (isGrounded)
            {
                rb.linearVelocity = new Vector2(rb.linearVelocity.x, jumpForce);
            }
            jumpRequested = false;
        }

        // if (jumpRequested && jumpCount < nbMaxJumpsAllowed)
        // {
        //     jumpCount++;
        //     rb.linearVelocity = new Vector2(rb.linearVelocity.x, jumpForce);
        //     jumpRequested = false;
        // }

        if (!enabledShortJump) return;

        if (!jumpHeld && rb.linearVelocity.y > 0f && rb.linearVelocity.y <= jumpForce + 0.1f)
        // if (!jumpHeld && rb.linearVelocity.y > 0f)
        {
            rb.linearVelocity = new Vector2(
                rb.linearVelocity.x,
                rb.linearVelocity.y * 0.5f
            );
        }
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

    public void ToggleState(bool state)
    {
        enabled = !state;
    }
}
