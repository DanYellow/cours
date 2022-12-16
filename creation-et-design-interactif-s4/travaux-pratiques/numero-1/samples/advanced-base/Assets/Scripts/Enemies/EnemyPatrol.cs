
using UnityEngine;
using System.Collections;

public class EnemyPatrol : MonoBehaviour
{
    public Rigidbody2D rb;
    public Animator animator;
    public float speed;

    public bool isFacingRight = false;

    private bool isIdle;

    public float idleTime = 2f;
    public float walkTime = 5f;

    private void Start()
    {
        StartCoroutine(ChangeState());
    }

    private void Update()
    {
        if (isIdle)
        {
            Idle();
        }
        else
        {
            Move();
        }
        animator.SetFloat("MoveDirectionX", Mathf.Abs(rb.velocity.x));
    }

    IEnumerator ChangeState()
    {
        while (true)
        {
            isIdle = false;
            yield return new WaitForSeconds(idleTime);
            isIdle = true;
            yield return new WaitForSeconds(walkTime);
        }
    }

    private void Idle()
    {
        rb.velocity = Vector2.zero;
    }

    private void Move()
    {
        if (isFacingRight)
        {
            rb.velocity = new Vector2(speed, 0f);
        }
        else
        {
            rb.velocity = new Vector2(-speed, 0f);
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if(isIdle) return;
        isFacingRight = !isFacingRight;
        transform.Rotate(0f, 180f, 0f);
    }
}
