using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    // Start is called before the first frame update

    public Rigidbody2D rb;
    public Animator animator;

    private float _horizontalMovement;
    private bool _isFacingRight = false;
    public float moveSpeed;
    public float jumpForce;

    private bool isJumping = false;
    private bool hasStompedEnemy = true;

    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    private Vector3 _velocity = Vector3.zero;
    private bool rotating;
    private bool isLevelStarted = false;

    public GameObject beginLevel;

    // Update is called once per frame - http://web4.ensiie.fr/~guillaume.bouyer/RVIG/Unity.pdf
    void Update()
    {
        // https://stackoverflow.com/questions/65951528/unity-in-what-cases-should-i-add-time-deltatime
        // https://stackoverflow.com/questions/63604203/when-do-you-multiply-by-time-deltatime-in-unity
        // Temps écoulé depuis la dernière "frame". Utilisation obligatoire pour s'assurer que le jeu tourne de la même façon sur tous les machines
        
        if(!isLevelStarted && transform.position.x < beginLevel.transform.position.x) {
            _horizontalMovement = 0.5f * moveSpeed;
        } else {
            isLevelStarted = true;
            _horizontalMovement = Input.GetAxisRaw("Horizontal") * moveSpeed;
        }

        // if (transform.position.x > beginLevel.transform.position.x)
        // {
        //     isLevelStarted = true;
        // }
        // else if(!isLevelStarted)
        // {
        //     // isLevelStarted = true;
        //     _horizontalMovement = 0.5f * moveSpeed; // 0.1f
        // }

        ManageAnimator();

        if (Input.GetButtonDown("Jump") && IsGrounded())
        {
            isJumping = true;
            Jump(false);
            isJumping = false;
        }

        if (Input.GetButtonUp("Jump") && rb.velocity.y > 0f)
        {
            Jump(true);
        }
    }

    void ManageAnimator()
    {
        animator.SetFloat("HorizontalSpeed", Mathf.Abs(_horizontalMovement));
        animator.SetBool("IsJumping", isJumping);
        animator.SetFloat("VerticalSpeed", rb.velocity.y);
    }

    private void FixedUpdate()
    {
        Move();
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listCollisionLayers);
    }

    void Move()
    {
        // Vector3 targetVelocity = new Vector2(_horizontalMovement, rb.velocity.y);
        // rb.velocity = Vector3.SmoothDamp(rb.velocity, targetVelocity, ref _velocity, .05f);
        rb.velocity = new Vector2(_horizontalMovement * Time.fixedDeltaTime, rb.velocity.y);

        if (_horizontalMovement > 0 && !_isFacingRight || _horizontalMovement < 0 && _isFacingRight)
        {
            _isFacingRight = !_isFacingRight;
            Vector3 localScale = transform.localScale;
            localScale.x *= -1f;
            transform.localScale = localScale;

            // transform.Rotate(0f, 180f, 0f);
        }
    }

    void Jump(bool shortJump = false)
    {
        rb.velocity = new Vector2(rb.velocity.x, (shortJump ? jumpForce * 0.5f : jumpForce));
    }

    void OnDrawGizmosSelected()
    {
        if (groundCheck != null)
        {
            Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
        }
    }
}
