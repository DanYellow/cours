
using UnityEngine;

public class EnemyPatrol : MonoBehaviour
{
    public Rigidbody2D rb;
    public Animator animator;
    public float speed;

    public bool isFacingRight = false;

    private void Update()
    {
        if (isFacingRight)
        {
            rb.velocity = new Vector2(speed, 0f);
        }
        else
        {
            rb.velocity = new Vector2(-speed, 0f);
        }
        animator.SetFloat("MoveDirectionX", Mathf.Abs(rb.velocity.x));
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        isFacingRight = !isFacingRight;
        transform.Rotate(0f, 180f, 0f);
    }
}
