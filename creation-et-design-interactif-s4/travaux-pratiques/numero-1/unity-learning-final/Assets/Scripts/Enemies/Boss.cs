using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Boss : MonoBehaviour
{
    private Vector3[] listDirections = new Vector3[2];
    [SerializeField] private float range;
    [SerializeField] private LayerMask playerLayer;
    private Vector3 destination;
    [SerializeField] float speed = 20;
    private bool isAttacking;
    private bool isChargingAttack = false;
    private bool sawPlayer = false;

    private bool isFacingRight = false;
    public Transform player;

    public float fallSpeed = 10f;

    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    public Animator animator;
    public Rigidbody2D rb;

    public float jumpHeight;

    private bool isGrounded;

    // Start is called before the first frame update
    void Start()
    {
        // Debug.Log("start GetComponent<Rigidbody2D>().inertia " + GetComponent<Rigidbody2D>().inertia);
        // StartCoroutine(Attack());
    }

    // Update is called once per frame
    void Update()
    {
        animator.SetBool("IsAttacking", isAttacking);
        // if (sawPlayer)
        // {
        //     transform.position = Vector2.MoveTowards(transform.position, destination, speed * Time.deltaTime);
        //     //  transform.Translate(destination * Time.deltaTime * speed);
        // }

        // if (Mathf.Abs(transform.position.y - destination.y) < 0.01f && sawPlayer)
        // {
        //     // sawPlayer = false;
        //     Vector3 newDestination = new Vector3(transform.position.x, transform.position.y - 10f, transform.position.z);
        //     transform.position = Vector2.MoveTowards(transform.position, newDestination, fallSpeed * Time.deltaTime);
        //     // StartCoroutine(Attack());
        // }
        // LookAtPlayer();

        if (Input.GetKeyDown(KeyCode.M) && IsGrounded())
        {
            isChargingAttack = true;

            destination = new Vector2(player.position.x, player.position.y + jumpHeight);

            float distanceFromPlayer = player.position.x - transform.position.x;
        }

        if (isChargingAttack)
        {
            transform.position = Vector2.MoveTowards(transform.position, destination, speed * Time.deltaTime);
            if (Vector2.Distance(transform.position, destination) < 0.01f)
            {
                isAttacking = true;
            }
        }

        if (isAttacking)
        {
            isChargingAttack = false;
            transform.position = Vector2.MoveTowards(
                transform.position,
                new Vector2(transform.position.x, player.position.y),
                speed * Time.deltaTime
            );
        }
    }

    void FixedUpdate()
    {
        // DetectPlayer();

        isGrounded = IsGrounded();
        // rb.velocity = new Vector2(rb.velocity.x, rb.velocity.y);

        if (isAttacking)
        {

            Attack();

            // JumpAttack();
            // isAttacking = false;
        }
    }

    // void DetectPlayer()
    // {
    //     GetDirections();

    //     for (int i = 0; i < listDirections.Length; i++)
    //     {
    //         Debug.DrawRay(transform.position, listDirections[i], Color.red);
    //         RaycastHit2D hit = Physics2D.Raycast(transform.position, listDirections[i], range, playerLayer);
    //         // RaycastHit2D foo = Physics2D.BoxCast()
    //         if (hit.collider != null && !sawPlayer)
    //         {
    //             sawPlayer = true;
    //             destination = new Vector3(hit.collider.transform.position.x, hit.collider.transform.position.y + 5.0f, hit.collider.transform.position.z);
    //             // destination = listDirections[i];
    //         }
    //     }
    // }

    void JumpAttack()
    {
        float distanceFromPlayer = player.position.x - transform.position.x;
        if (isGrounded)
        {
            Debug.Log("player.position.x " + distanceFromPlayer + " " + player.position.x);
            GetComponent<Rigidbody2D>().inertia = 100f;
            // GetComponent<Rigidbody2D>().velocity = new Vector2(distanceFromPlayer, jumpHeight);
            Debug.Log("GetComponent<Rigidbody2D>().inertia " + GetComponent<Rigidbody2D>().inertia);
            // rb.velocity = Vector3.zero;
            // rb.angularVelocity = 0;
            // Debug.Log("ffefe " + new Vector2(distanceFromPlayer, jumpHeight));
            // GetComponent<Rigidbody2D>().AddForce(new Vector2(distanceFromPlayer, jumpHeight), ForceMode2D.Impulse);
            rb.AddForce(new Vector2(distanceFromPlayer, jumpHeight), ForceMode2D.Impulse);
        }
    }

    private void GetDirections()
    {
        listDirections[0] = transform.right * range; //Right direction
        listDirections[1] = -transform.right * range; //Left direction
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (isAttacking)
        {
            isAttacking = false;

            if (other.gameObject.CompareTag("Player"))
            {
                if (other.contacts[0].normal.y > 0.5f)
                {
                    Health playerHealth = other.gameObject.GetComponent<Health>();

                    Player player = other.gameObject.GetComponent<Player>();
                    if (!player.IsInvisible())
                    {
                        playerHealth.TakeDamage(1f);
                    }
                }
            }

            StartCoroutine(Reverse());
        }

        if (other.gameObject.CompareTag("Player"))
        {
            if (other.contacts[0].normal.y < -0.5f)
            {
                if (IsBackward())
                {
                    Animator playerAnimator = other.gameObject.GetComponent<Animator>();
                    playerAnimator.SetTrigger("StompedEnemy");
                    other.gameObject.GetComponent<Rigidbody2D>().velocity += Vector2.up * 10f;

                    GetComponent<Health>().TakeDamage(0.5f);
                    StartCoroutine(Reverse(0));
                } else {
                    Health playerHealth = other.gameObject.GetComponent<Health>();

                    Player player = other.gameObject.GetComponent<Player>();
                    if (!player.IsInvisible())
                    {
                        playerHealth.TakeDamage(1f);
                    }
                }
            }
        }
    }

    bool IsBackward()
    {
        Vector3 angles = transform.rotation.eulerAngles;

        return angles.z == 180f;
    }

    void Attack()
    {
        Vector3 angles = transform.rotation.eulerAngles;
        angles.z = 180f;
        transform.rotation = Quaternion.Euler(angles);
    }

    IEnumerator Reverse(float waitTime = 2f)
    {
        yield return new WaitForSeconds(waitTime);

        Vector3 angles = transform.rotation.eulerAngles;
        angles.z = 0f;
        transform.rotation = Quaternion.Euler(angles);

    }
    public void LookAtPlayer()
    {
        // 	Vector3 flipped = transform.localScale;
        // 	flipped.z *= -1f;

        if (transform.position.x > player.position.x && isFacingRight)
        {
            // transform.localScale = flipped;
            transform.Rotate(0f, 180f, 0f);
            isFacingRight = false;
        }
        else if (transform.position.x < player.position.x && !isFacingRight)
        {
            // transform.localScale = flipped;
            transform.Rotate(0f, 180f, 0f);
            isFacingRight = true;
        }
    }

    private bool IsGrounded()
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
}
