
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

    bool isFalling;

    [SerializeField]
    private int jumpCount;
    public int maxJumpCount;

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

        if (rb.velocity.y < fallingThreshold)
        {
            isFalling = true;
        }

        if (isFalling && isGrounded)
        {
            Debug.Log("rb.velocity.y : " + rb.velocity.y);
            isFalling = false;
        }

        if (Input.GetKeyDown(KeyCode.Alpha0))
        {
            Debug.Log("fezfezfz");
             transform.Translate(VectorFromAngle (45));
            // AddForceAtAngle(15f, 45);
        }

        Flip();
    }

    public void AddForceAtAngle(float force, float angle)
    {
        float xcomponent = Mathf.Cos(angle * Mathf.PI / 180) * force;
        float ycomponent = Mathf.Sin(angle * Mathf.PI / 180) * force;

        Vector2 vforce = new Vector2(xcomponent, ycomponent);
        rb.velocity = vforce;
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
    }

    private void Move()
    {
        rb.velocity = new Vector2(moveDirectionX * moveSpeed, rb.velocity.y);
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
        rb.velocity = new Vector2(rb.velocity.x, jumpPower);
        if (!shortJump)
        {
            jumpCount = jumpCount + 1;
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
