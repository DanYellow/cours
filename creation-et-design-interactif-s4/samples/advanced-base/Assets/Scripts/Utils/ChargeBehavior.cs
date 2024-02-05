using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ChargeBehavior : MonoBehaviour
{
    [Header("Distance of sight")]
    public float range = 100;
    public LayerMask targetLayer;

    public float knockbackStrength = 2.5f;

    private Vector3 destination;

    private List<Vector3> listDirections = new List<Vector3>();
    private bool isAttacking;
    private bool isCharging = false;

    public SpriteRenderer spriteRenderer;

    private float checkTimer;
    public float checkDelay;
    public float speed;
    public Rigidbody2D rb;
    public Animator animator;

    public BoxCollider2D bc;
    public LayerMask obstacleLayers;

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

    private bool attackWaiting = false;



    // Start is called before the first frame update
    void Start()
    {
        normalImpulseThreshold = rb.mass * 1000 / 3000;
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

    private void FixedUpdate()
    {
        if (isAttacking && !attackWaiting)
        {

            var dir = ((transform.position + Vector3.right * 5) - transform.position).normalized * speed;
            // rb.MovePosition(rb.position + Vector2.right * 0.005f);
            // print("rb.velocity.x " + rb.velocity.x);
            // rb.AddForce(destination * speed, ForceMode2D.Impulse);
            // rb.velocity = dir;
            // StartCoroutine(Charge());
        }
        else
        {
            checkTimer += Time.deltaTime;
            if (checkTimer > checkDelay)
                CheckForTarget();
        }

        if (animator != null)
        {
            animator.SetFloat("VelocityX", rb.velocity.x);
        }

        Vector3 startCast = new Vector2(bc.bounds.min.x, bc.bounds.center.y);
        Vector3 endCast = new Vector2(bc.bounds.min.x - 0.15f, bc.bounds.center.y);
        Debug.DrawLine(startCast, endCast, Color.red);

        RaycastHit2D hitObstacle = Physics2D.Linecast(startCast, endCast, obstacleLayers);

        if (hitObstacle.collider != null && isAttacking)
        {
            Stop(hitObstacle.collider);
        }
    }

    private IEnumerator Charge(Vector3 target)
    {
        isCharging = true;
        spriteRenderer.color = Color.red;
        Vector2 startPosition = transform.position;

        float dirX = (target - transform.position).normalized.x;

        float current = 0;
        float duration = 1.15f;

        while (current <= 1)
        {
            current += Time.deltaTime / duration;

            var dir = (transform.position * (dirX * -1)).normalized;

            rb.velocity = dir;

            yield return null;
        }

        rb.velocity = Vector2.zero;

        yield return null;

        rb.velocity = new Vector2(speed * dirX, rb.velocity.y);
    }

    private void CheckForTarget()
    {
        //Check if gameobject sees player in direction selected
        for (int i = 0; i < listDirections.Count; i++)
        {
            float offset;
            if (isFacingRight)
            {
                offset = (listDirections[i].x > 0) ? range : (range / 2);
            }
            else
            {
                offset = (listDirections[i].x < 0) ? range : (range / 2);
            }

            Vector3 rayDirection = listDirections[i] * range;
            Vector3 startCast = transform.position;
            Vector3 endCast = transform.position + (rayDirection.normalized * offset);
            Debug.DrawLine(startCast, endCast, Color.green);

            RaycastHit2D hit = Physics2D.Linecast(startCast, endCast, targetLayer);

            if (hit.collider != null && !isAttacking && !attackWaiting)
            {
                destination = listDirections[i];
                isAttacking = true;
                checkTimer = 0;
                StartCoroutine(Charge(hit.collider.transform.position));

                Flip();
            }
        }
    }

    private void Stop(Collider2D collider)
    {
        isAttacking = false;
        animator.SetTrigger("IsHit");
        if (rb.velocity.magnitude == 0)
        {
            return;
        }

        if (collider.TryGetComponent<Knockback>(out Knockback knockback))
        {
            Vector2 direction = (transform.position - collider.transform.position).normalized * -1f;
            knockback.Knockbacked(direction, knockbackStrength);
        }
        
        if (isOnScreen)
        {
            onCrushSO.Raise(shakeInfo);
        }

        rb.velocity = Vector2.zero;
        spriteRenderer.color = new Color(1, 1, 1, 1);
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

    void OnDrawGizmos()
    {
        // if (bc != null)
        // {
        //     Gizmos.color = Color.red;
        //     Gizmos.DrawLine(
        //         new Vector2(bc.bounds.min.x - range, bc.bounds.center.y),
        //         new Vector2(bc.bounds.max.x + (range / 6), bc.bounds.center.y)
        //     );
        // }
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
