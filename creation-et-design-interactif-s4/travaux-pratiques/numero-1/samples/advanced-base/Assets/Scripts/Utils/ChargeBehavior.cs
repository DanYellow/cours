using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChargeBehavior : MonoBehaviour
{
    public float range = 100;
    public LayerMask targetLayer;

    private Vector3 destination;

    private List<Vector3> listDirections = new List<Vector3>();
    public bool isAttacking;

    private float checkTimer;
    public float checkDelay;
    public float speed;
    public Rigidbody2D rb;
    public Animator animator;

    public bool isFacingRight = true;

    [Header("Manage directions where the system can looking for on specific layers")]
    public bool checkRight = true;
    public bool checkLeft = true;
    public bool checkTop = true;
    public bool checkBottom = true;

    private float normalImpulseThreshold = 0;

    [Header("Shake effect")]
    public CameraShakeEventChannelSO onCrushSO;
    public ShakeTypeVariable shakeInfo;

    private bool isOnScreen = false;

    // Start is called before the first frame update
    void Start()
    {
        normalImpulseThreshold = (rb.mass * 1000) / 3000;
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
        DetectCollision(other);
    }

    private void DetectCollision(Collision2D other)
    {
        ContactPoint2D[] allContacts = new ContactPoint2D[other.contactCount];
        other.GetContacts(allContacts);


        foreach (ContactPoint2D contact in allContacts)
        {
            //  if(contact.point.y < transform.position.y) {
            //     Debug.Log(contact.point + " " + rb.velocity);
            //     // Debug.Log(i.point + " " + rb.velocity.sqrMagnitude);
            // }
            if (
                (contact.normal.x < -0.5 && contact.normalImpulse > normalImpulseThreshold) ||
                (contact.normal.x > 0.5 && contact.normalImpulse > normalImpulseThreshold)
            )
            {
                animator.SetTrigger("IsHit");
                if (isOnScreen)
                {
                    onCrushSO.Raise(shakeInfo);
                }
                Stop();
            }
        }
    }

    private void Stop()
    {
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
        rb.AddForce(Vector2.right, ForceMode2D.Impulse);
        // rb.AddForce(bounceForce, ForceMode2D.Impulse);
    }

    void OnBecameInvisible()
    {
        isOnScreen = false;
    }

    void OnBecameVisible()
    {
        isOnScreen = true;
    }
}
