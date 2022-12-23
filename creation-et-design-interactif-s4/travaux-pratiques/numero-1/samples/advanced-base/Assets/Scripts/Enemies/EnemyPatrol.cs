
using UnityEngine;
using System.Collections;
using UnityEditor;

public class EnemyPatrol : MonoBehaviour
{
    public Rigidbody2D rb;
    public Animator animator;
    public float speed;

    public bool isFacingRight = false;

    private bool isIdle;

    private float idleTime;

    [Tooltip("Define how long the enemy will walk")]
    public float walkTime = 5f;

    private void Awake() {
        // We don't want the script to be enabled by default but...
        enabled = false;
    }

    private void Start()
    {
        idleTime = Mathf.Round(Random.Range(0, 3.5f));
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
            // Enemy will walk during X seconds...
            isIdle = false;
            yield return new WaitForSeconds(walkTime);

            // ...then wait during X seconds...
            isIdle = true;
            yield return new WaitForSeconds(idleTime);
        }
    }

    private void Idle()
    {
        rb.velocity = Vector2.zero;
    }

    private void Move()
    {
        // if (isFacingRight)
        // {
        //     rb.velocity = new Vector2(speed, rb.velocity.y);
        // }
        // else
        // {
        //     rb.velocity = new Vector2(-speed, rb.velocity.y);
        // }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (isIdle) return;
        Flip();
    }

    public void Flip() {
        isFacingRight = !isFacingRight;
        transform.Rotate(0f, 180f, 0f);
    }

    private void OnBecameVisible()
    {
        enabled = true;
    }

    private void OnBecameInvisible()
    {
        // We stop the enemy when is not visible or else
        // it might continue to run but whoen be able to change direction
        Idle();
        enabled = false;
    }
}