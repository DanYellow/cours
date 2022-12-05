using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChargeBehavior : MonoBehaviour
{
    public float range = 100;
    public LayerMask targetLayer;

    private Vector3 destination;

    // [NamedArrayAttribute (new string[] {"Neutral", "Happy", "Sad", "test"})]
    private List<Vector3> listDirections = new List<Vector3>();
    public bool isAttacking;

    private float checkTimer;
    public float checkDelay;
    public float speed;
    public Rigidbody2D rb;
    public Animator animator;
    private string lastAnimationPlayed = "";
    public bool isFacingRight = true;

    public bool checkRight = true;
    public bool checkLeft = true;
    public bool checkTop = true;
    public bool checkBottom = true;


    // Start is called before the first frame update
    void Start()
    {
        if (checkLeft)
        {
            listDirections.Add(Vector3.left);
        }

        if (checkTop)
        {
            listDirections.Add(Vector3.up);
        }

        if (checkBottom)
        {
            listDirections.Add(Vector3.down);
        }

        if (checkRight)
        {
            listDirections.Add(Vector3.right);
        }
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.P))
        {
            rb.AddForce(destination * speed * 0.5f, ForceMode2D.Impulse);
        }
    }


    private void FixedUpdate()
    {
        if (isAttacking)
        {
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
        for (int i = 0; i < listDirections.Count; i++)
        {
            Vector3 rayDirection = listDirections[i] * range;
            Debug.DrawRay(transform.position, rayDirection, Color.green);
            RaycastHit2D hit = Physics2D.Raycast(transform.position, rayDirection, range, targetLayer);

            if (hit.collider != null && !isAttacking)
            {

                destination = listDirections[i];
                isAttacking = true;
                checkTimer = 0;
                Flip();
            }
        }
    }

    private void OnCollisionStay2D(Collision2D other)
    {
        ContactPoint2D[] allPoints = new ContactPoint2D[other.contactCount];
        other.GetContacts(allPoints);

        foreach (var contact in allPoints)
        {
            if(contact.point.y < transform.position.y) {
                Debug.Log(contact.point + " " + rb.velocity);
                // Debug.Log(i.point + " " + rb.velocity.sqrMagnitude);
            }

            if(
                (contact.normal.x < -0.5 && contact.normalImpulse > 1000) ||
                (contact.normal.x > 0.5 && contact.normalImpulse > 1000)
            ) {
                Debug.Log("fff " + "test");
            }
        }

       

        // if (rb.velocity == Vector2.zero && isAttacking)
        // {
        //     Debug.Log("TEssst");
        //     // animator.SetTrigger("IsHit");
        //     Stop();
        // }
        // DetectCollision(other);
        // if (
        //     rb.velocity == Vector2.zero &&
        //     animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !animator.IsInTransition(0)
        // )
        // {
        //     if (
        //         (destination.x > 0 || destination.x < 0) &&
        //         lastAnimationPlayed != "RinoHitWall"
        //     )
        //     {
        //         lastAnimationPlayed = "RinoHitWall";
        //         animator.SetTrigger("IsHit");
        //         Debug.Log("Hit");
        //         // Stop();
        //         Flip();
        //     }
        // }
    }

    private void DetectCollision(Collision2D other)
    {
        ContactPoint2D[] contacts = new ContactPoint2D[10];
        other.GetContacts(contacts);

        foreach (ContactPoint2D contact in contacts)
        {
            if (
                (contact.normal.x < -0.5) ||
                (contact.normal.x > 0.5)
            )
            {
                Debug.Log("ttrtr");
            }
        }
    }

    private void Stop()
    {
        // destination = transform.position; //Set destination as current position so it doesn't move
        isAttacking = false;
    }

    private void Flip()
    {
        if (
                   (isFacingRight && destination == Vector3.left) ||
                   (!isFacingRight && destination == Vector3.right)
               )
        {
            isFacingRight = !isFacingRight;
            transform.Rotate(0f, 180f, 0f);
        }
    }

    IEnumerator HitObstacle()
    {
        yield return new WaitForSeconds(0.15f);
        Vector2 bounceForce = Vector2.one * 5;

        // Debug.Log("Testtt " + bounceForce);
        // rb.velocity = bounceForce;
        // transform.Rotate(0f, 180f, 0f);
        // destination *= -1;
    }
}
