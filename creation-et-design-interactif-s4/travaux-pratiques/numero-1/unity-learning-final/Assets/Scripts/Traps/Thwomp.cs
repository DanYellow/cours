using System.Collections;
using UnityEngine;

public class Thwomp : MonoBehaviour
{
    public Transform targetPosition;
    public Transform originPosition;
    // private Transform origin;
    public float stayDownTime = 3.0f;
    public float upSpeed = 3.0f;
    public SpriteRenderer spriteRenderer;
    public Animator animator;

    bool isFalling;

    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public float groundCheckRadius;

    public float fallSpeed = 7.0f;

    private void Awake()
    {
        // origin = transform;
    }

    private void Update()
    {
        if (transform.position.y >= originPosition.position.y)
        {
            StartCoroutine(ToggleStatus(true));
            // isFalling = true;
        }
        if (transform.position.y <= targetPosition.position.y)
        {
            StartCoroutine(ToggleStatus(false));
            // isFalling = false;
        }

       

        if (isFalling)
        {
            transform.position = Vector2.MoveTowards(transform.position, targetPosition.position, fallSpeed * Time.deltaTime);
        }
        else
        {
            transform.position = Vector2.MoveTowards(transform.position, originPosition.position, upSpeed * Time.deltaTime);
        }
        animator.SetBool("IsFalling", isFalling);
    }

    IEnumerator ToggleStatus(bool val) {
        yield return new WaitForSeconds(3f);
        isFalling = val;
    }

    private void FixedUpdate()
    {
        if (IsGrounded())
        {
            StartCoroutine(Impact());
        }
    }

    public IEnumerator Impact()
    {
        spriteRenderer.color = new Color(1f, 0.511f, 1f, 1f);
        yield return new WaitForSeconds(0.5f);
        spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
        yield return new WaitForSeconds(0.7f);
    }

    void OnDrawGizmosSelected()
    {
        if (groundCheck != null)
        {
            Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
        }
    }


    // IEnumerator Start()
    // {
    //     Vector3 pointA = transform.position;
    //     origin = transform;
    //     while (true)
    //     {
    //         yield return StartCoroutine(MoveObject(transform, pointA, targetPosition.position, fallSpeed));
    //         yield return StartCoroutine(MoveObject(transform, targetPosition.position, pointA, speed));
    //     }
    // }

    // IEnumerator MoveObject(Transform thisTransform, Vector3 startPos, Vector3 endPos, float time)
    // {
    //     float i = 0.0f;
    //     float rate = 1.0f / time;
    //     while (i < 1.0f)
    //     {
    //         i += Time.deltaTime * rate;
    //         transform.position = Vector3.Lerp(startPos, endPos, i);
    //         yield return null;
    //     }
    //     yield return new WaitForSeconds(stayDownTime); 7.12
    // }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            if (other.contacts[0].normal.y > 0.5f && isFalling)
            {
                Health playerHeath = other.gameObject.GetComponent<Health>();
                playerHeath.TakeDamage(100f);
            }

            if (other.contacts[0].normal.y < -0.5f)
            {
                other.gameObject.transform.parent = transform;

            }
        }
    }

    private void OnCollisionStay2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player") && PlayerMovement.instance.IsRoofed())
        {
            Health playerHeath = other.gameObject.GetComponent<Health>();
            playerHeath.TakeDamage(100f);
        }
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listCollisionLayers);
    }

    void OnCollisionExit2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            other.gameObject.transform.parent = null;
        }
    }
}
