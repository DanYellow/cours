using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Thwomp : MonoBehaviour
{
    private Vector3 originPosition;

    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public float groundCheckRadius;
    public Rigidbody2D rb;
    public Animator animator;

    public float speed = 5f;
    public float stayUpTime = 2.0f;
    public float stayDownTime = 3.0f;

    void Awake()
    {
        rb = null;
        originPosition = transform.position;
    }

    void Start()
    {
        // StartCoroutine(UpAndDown());
        // 
    }

    private void Update()
    {
        animator.SetFloat("VerticalSpeed", GetComponent<Rigidbody2D>().velocity.y);
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listCollisionLayers);
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            if (other.contacts[0].normal.y > 0.5f)
            {
                Health playerHeath = other.gameObject.GetComponent<Health>();
                playerHeath.TakeDamage(100f);
            }
        }

        if (IsGrounded())
        {
            StartCoroutine(BackToOrigin());
        }
    }

    private void OnTriggerEnter2D(Collider2D other) {
        if (IsGrounded())
        {
            Debug.Log("fef");
            StartCoroutine(BackToOrigin());
        }
    }

    IEnumerator BackToOrigin()
    {
        // Remove Dynamic rb type to Kinematic
        // Go to origin position
        // Remove Kinematic to rb type Dynamic
        rb.bodyType = RigidbodyType2D.Kinematic;
        yield return new WaitForSeconds(stayDownTime);

        float elapsedTime = 0f;
        while (elapsedTime <= speed)
        {
            elapsedTime = elapsedTime + Time.deltaTime;
            float percent = Mathf.Clamp01(elapsedTime / speed);

            transform.position = Vector3.Lerp(transform.position, originPosition, percent);

            yield return null;
        }
        yield return new WaitForSeconds(stayUpTime);
        rb.bodyType = RigidbodyType2D.Dynamic;
    }
}
