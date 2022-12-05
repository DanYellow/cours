using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChargeBehavior : MonoBehaviour
{
    public float range = 100;
    public LayerMask targetLayer;

    private Vector3 destination;
    private Vector3[] listDirections = new Vector3[4];
    public bool isAttacking;

    private float checkTimer;
    public float checkDelay;
    public float speed;
    public Rigidbody2D rb;
    public Animator animator;
    private string lastAnimationPlayed = "";


    // Start is called before the first frame update
    void Start()
    {
        listDirections[0] = transform.right; // Right direction
        listDirections[1] = -transform.right; // Left direction
        listDirections[2] = transform.up; // Up direction
        listDirections[3] = -transform.up; // Down direction
    }


    private void FixedUpdate()
    {
        if (isAttacking)
        {
            // rb.velocity = new Vector2(destination.x * speed, rb.velocity.y);

            rb.AddForce(destination * speed, ForceMode2D.Impulse);
        }
        else
        {
            checkTimer += Time.deltaTime;
            if (checkTimer > checkDelay)
                CheckForTarget();
        }

        animator.SetFloat("MoveDirectionX", Mathf.Abs(rb.velocity.x));
    }

    private void CheckForTarget()
    {
        //Check if spikehead sees player in all 4 directions
        for (int i = 0; i < listDirections.Length; i++)
        {
            Vector3 rayDirection = listDirections[i] * range;
            Debug.DrawRay(transform.position, rayDirection, Color.green);
            RaycastHit2D hit = Physics2D.Raycast(transform.position, rayDirection, range, targetLayer);

            if (hit.collider != null && !isAttacking)
            {
                isAttacking = true;
                destination = listDirections[i];
                checkTimer = 0;
            }
        }
    }

    private void OnCollisionStay2D(Collision2D other)
    {
        if (
            rb.velocity == Vector2.zero &&
            animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !animator.IsInTransition(0)
        )
        {
            if (
                (destination.x > 0 || destination.x < 0) &&
                lastAnimationPlayed != "RinoHitWall"
            )
            {
                lastAnimationPlayed = "RinoHitWall";
                animator.SetTrigger("IsHit");
                Stop();
            }
        }
    }

    private void Stop()
    {
        Debug.Log("efefefe");
        // destination = transform.position; //Set destination as current position so it doesn't move
        isAttacking = false;
    }

    IEnumerator HitObstacle() {
        yield return new WaitForSeconds(0.15f);
        Vector2 bounceForce = Vector2.right * 1;

        // Debug.Log("Testtt " + bounceForce);
        // rb.velocity = new Vector2(bounceForce.x, rb.velocity.y);
        // transform.Rotate(0f, 180f, 0f);
        // destination *= -1;
    }
}
