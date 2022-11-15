using System.Collections;
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

    private bool isFacingRight = false;
    public Transform player;

    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    public Animator animator;
    public Rigidbody2D rb;

    public float jumpHeight;

    private bool isGrounded;
    private bool isAttackFinished = true;
    private bool isDead = false;

    public Health health;

    public BossInfo bossInfo;

    public CircleCollider2D fightDetection;

    private void Start()
    {
        health.onDamage += TakeDamage;
        health.onDie += Die;

        bossInfo.SetHealth(health.GetMaxHealth(), health.GetMaxHealth());
        bossInfo.SetName("Test - le mangeur");
    }

    // Update is called once per frame
    void Update()
    {
        if (isDead) return;
        animator.SetBool("IsAttacking", isAttacking);

        LookAtPlayer();
        Attack();
    }

    void FixedUpdate()
    {
        if (isDead) return;
        DetectPlayer();
    }

    void TakeDamage()
    {
        bossInfo.SetHealth(health.GetHealth(), health.GetMaxHealth());
    }

    void DetectPlayer()
    {
        GetDirections();

        for (int i = 0; i < listDirections.Length; i++)
        {
            Debug.DrawRay(transform.position, listDirections[i], Color.red);
            RaycastHit2D hit = Physics2D.Raycast(transform.position, listDirections[i], range, playerLayer);
            // RaycastHit2D foo = Physics2D.BoxCast()
            if (hit.collider != null && IsGrounded() && isAttackFinished == true)
            {
                isChargingAttack = true;
                isAttackFinished = false;
                destination = new Vector2(player.position.x, player.position.y + jumpHeight);
            }
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
                        other.gameObject.GetComponent<Rigidbody2D>().velocity += Vector2.left * 10f;

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

                    health.TakeDamage(0.5f);
                    StartCoroutine(Reverse(0));
                }
                else
                {
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

        return angles.z > 170f;
    }

    void Attack()
    {
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
            Vector3 angles = transform.rotation.eulerAngles;
            angles.z = 180f;
            transform.rotation = Quaternion.Euler(angles);

            transform.position = Vector2.MoveTowards(
                transform.position,
                new Vector2(transform.position.x, player.position.y),
                1.5f * speed * Time.deltaTime
            );
        }
    }

    IEnumerator Reverse(float waitTime = 2f)
    {
        yield return new WaitForSeconds(waitTime);

        Vector3 angles = transform.rotation.eulerAngles;
        angles.z = 0f;
        transform.rotation = Quaternion.Euler(angles);
        isAttackFinished = true;

    }
    void LookAtPlayer()
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

    public void Die()
    {
        GetComponent<BoxCollider2D>().enabled = false;
        rb.bodyType = RigidbodyType2D.Static;
        rb.velocity = Vector3.zero;

        animator.enabled = false;
        animator.enabled = true;
        animator.SetTrigger("Die");
        isDead = true;

        bossInfo.gameObject.SetActive(false);

        Destroy(gameObject, 0.75f);
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

    private void OnTriggerEnter2D(Collider2D other)
    {
        if(other.CompareTag("Player")) {
            bossInfo.gameObject.SetActive(true);
        }
    }

    private void OnDestroy()
    {
        health.onDie -= Die;
    }
}
