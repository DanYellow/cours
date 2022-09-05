using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Thwomp : MonoBehaviour
{
    private Vector3 originPosition;
    public Transform targetPosition;
    public LayerMask listCollisionLayers;
    public Transform groundCheck;
    public Transform roofCheck;
    public float groundCheckRadius;
    public Rigidbody2D rb;
    public Animator animator;

    public float speed = 2f;
    public float stayUpTime = 2.0f;
    public float stayDownTime = 3.0f;

    private bool isReverse = false;

    void Awake()
    {
        originPosition = transform.position;
    }

    void Start()
    {
        // StartCoroutine(UpAndDown());
        // 
        Debug.Log(transform.position);
        Debug.Log(targetPosition.position);
    }

    private void Update()
    {
        if (isReverse)
        {
            Debug.Log("Testttt");
            transform.position = Vector2.MoveTowards(transform.position, originPosition, speed * Time.deltaTime);
        }
        else
        {
            transform.position = Vector2.MoveTowards(transform.position, targetPosition.position, speed * Time.deltaTime);
        }

        if(IsGrounded()) {
            isReverse = true;
        }

        if(IsRoofed()) {
            isReverse = false;
        }

        // if (Vector3.Distance(transform.position, targetPosition.position) < 0.1f)
        // {
        // Debug.Log("Test" + Vector3.Distance(transform.position, targetPosition.position));
        //     isReverse = true;
        //     //It is within ~0.1f range, do stuff
        // }

        //  transform.Translate(new Vector3(transform.position.x, targetPosition.position.y, transform.position.z) * Time.deltaTime * speed);
        // animator.SetFloat("VerticalSpeed", GetComponent<Rigidbody2D>().velocity.y);
    }

    private bool IsGrounded()
    {
        return Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, listCollisionLayers);
    }

    private bool IsRoofed()
    {
        return Physics2D.OverlapCircle(roofCheck.position, groundCheckRadius, listCollisionLayers);
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

    private void OnTriggerEnter2D(Collider2D other)
    {
        Debug.Log("Hello");
        Stop();
        // Debug.Log("fef" + other.contacts[0].normal);
        // if (IsGrounded())
        // {
        //     StartCoroutine(BackToOrigin());
        // }
    }

    private void Stop()
    {
        isReverse = true;
        // originPosition = transform.position; //Set destination as current position so it doesn't move
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

    IEnumerator UpAndDown()
    {
        while (true)
        {
            transform.position = originPosition;
            yield return new WaitForSeconds(stayUpTime);

            float elapsedTime = 0f;
            while (elapsedTime <= speed)
            {
                elapsedTime = elapsedTime + Time.deltaTime;
                float percent = Mathf.Clamp01(elapsedTime / speed);

                transform.position = Vector3.Lerp(originPosition, targetPosition.position, percent);

                yield return null;
            }

            yield return new WaitForSeconds(stayDownTime);

        }
    }

    void OnDrawGizmosSelected()
    {
        if (groundCheck != null)
        {
            Gizmos.DrawWireSphere(groundCheck.position, groundCheckRadius);
        }

        if (roofCheck != null)
        {
            Gizmos.DrawWireSphere(roofCheck.position, groundCheckRadius);
        }
    }
}
