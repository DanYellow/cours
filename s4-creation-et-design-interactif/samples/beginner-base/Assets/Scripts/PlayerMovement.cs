using UnityEngine;

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

    public bool jumpRequested = false;
    public bool jumpReleased = false;

    public int nbMaxJumpsAllowed = 3;
    [SerializeField]
    private int jumpCount = 0;

    private float coyoteTime = 0.2f;
    private float coyoteTimeCounter;

    private void Start()
    {
        jumpCount = 0;
        // https://www.youtube.com/watch?v=EyKmLj2ICFw
        // val.CurrentValue = 41;
    }


    // Update is called once per frame
    void Update()
    {
        moveDirectionX = Input.GetAxisRaw("Horizontal");

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

        // float force = Input.GetButton("Jump") ? stompBounceForce * 1.2f : stompBounceForce;

        if (Input.GetButtonDown("Jump"))
        {
            jumpRequested = true;
        }
        if (Input.GetButtonUp("Jump"))
        {
            jumpReleased = true;
        }

        if (Input.GetKeyDown(KeyCode.Alpha0))
        {
            transform.Translate(VectorFromAngle(45));
            // AddForceAtAngle(15f, 45);
        }

        Flip();

        wasGrounded = isGrounded;
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

        if (jumpRequested)
        {
            // if (coyoteTimeCounter > 0f)
            // {
            //     Jump();
            //     coyoteTimeCounter = 0f;
            // }
            // else if (!isGrounded && jumpCount < nbMaxJumpsAllowed)
            // {
            //     Jump();
            // }

            if (isGrounded || jumpCount < nbMaxJumpsAllowed)
            {
                Jump();
            }
        }

        // if (jumpRequested && (coyoteTimeCounter > 0f || jumpCount < nbMaxJumpsAllowed))
        // if (jumpRequested && (isGrounded || (jumpCount < nbMaxJumpsAllowed && rb.li)))
        // {
        //     Jump();
        // }

        if (jumpReleased && rb.linearVelocityY > 0f)
        {
            rb.linearVelocity = new Vector2(
                rb.linearVelocity.x,
               rb.linearVelocity.y * 0.5f
            );
        }

        jumpReleased = false;
        jumpRequested = false;
        if (rb.linearVelocity.y < 0)
        {
            rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (2.5f - 1) * Time.fixedDeltaTime;
        }
        else if (rb.linearVelocity.y > 0 && !Input.GetButton("Jump"))
        {
            rb.linearVelocity += Vector2.up * Physics2D.gravity.y * (2f - 1) * Time.fixedDeltaTime;
        }


    }

    private void Move()
    {
        rb.linearVelocity = new Vector2(moveDirectionX * moveSpeed, rb.linearVelocity.y);
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

    public void ToggleState(bool state)
    {
        enabled = !state;
    }
}
