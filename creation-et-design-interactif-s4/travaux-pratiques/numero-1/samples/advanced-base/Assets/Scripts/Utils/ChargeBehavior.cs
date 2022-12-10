using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChargeBehavior : MonoBehaviour
{
    [Header("Change it according to your need")]
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

    [Header("Manage directions where the GameObject can looking for specific layers")]
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

        if (animator != null)
        {
            animator.SetFloat("MoveDirectionX", Mathf.Abs(rb.velocity.x));
        }
    }

    private void CheckForTarget()
    {
        //Check if gameobject sees player in direction selected
        for (int i = 0; i < listDirections.Count; i++)
        {
            float offset = 0;

            if(isFacingRight) {
                offset = (listDirections[i].x > 0) ? range : (range / 2);
            } else {
                offset = (listDirections[i].x < 0) ? range : (range / 2);
            }
            
            Vector3 rayDirection = listDirections[i] * range;
            Vector3 startCast = transform.position;
            Vector3 endCast = transform.position + (rayDirection.normalized * offset);
            Debug.DrawLine(startCast, endCast, Color.green);

            RaycastHit2D hit = Physics2D.Linecast(startCast, endCast, targetLayer);

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

    private void OnCollisionEnter2D(Collision2D other)
    {
        ContactPoint2D[] allContacts = new ContactPoint2D[other.contactCount];
        other.GetContacts(allContacts);

        if (other.gameObject.CompareTag("Player"))
        {
            foreach (ContactPoint2D contact in allContacts)
            {
                if (
                        (contact.normal.x > 0.5 && isFacingRight) ||
                        (contact.normal.x < -0.5 && !isFacingRight)
                    )
                {
                    Quaternion Rotation = Quaternion.Euler(0, 0, 45f);
                    Vector2 bounceForce = Vector2.one * 5 * -Mathf.Sign(contact.normal.x);
                    bounceForce.y = Mathf.Abs(bounceForce.y);
 
                    Rigidbody2D rb = other.gameObject.GetComponent<Rigidbody2D>();
                    rb.velocity += bounceForce;
                    rb.AddForce(bounceForce, ForceMode2D.Impulse);
                    DetectCollision(other);
                }
            }
        }
    }

    private void DetectCollision(Collision2D other)
    {
        ContactPoint2D[] allContacts = new ContactPoint2D[other.contactCount];
        other.GetContacts(allContacts);

        foreach (ContactPoint2D contact in allContacts)
        {
            if (
                (contact.normal.x < -0.5 || contact.normal.x > 0.5) &&
                contact.normalImpulse > normalImpulseThreshold
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
        // rb.AddForce(transform.right.normalized * -1f * 100f, ForceMode2D.Impulse);
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
