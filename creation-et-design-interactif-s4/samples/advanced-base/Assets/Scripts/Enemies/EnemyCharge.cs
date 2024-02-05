using System.Collections;
using UnityEngine;

public class EnemyCharge : MonoBehaviour
{
    [Header("Distance of sight")]
    public float sightLength = 4;

    public float knockbackStrength = 2.5f;

    public bool isCharging = false;
    private bool isOnScreen = false;

    private float obstacleDetectionLength = 0.15f;

    public SpriteRenderer spriteRenderer;

    private float checkTimer;
    public float delayBetweenCharges;
    public float speed;

    public Rigidbody2D rb;
    public Animator animator;

    public BoxCollider2D bc;

    [Header("Layers")]
    public LayerMask obstacleLayers;
    public LayerMask targetLayers;


    [Header("Shake effect")]
    public CameraShakeEventChannelSO onCrushSO;
    public ShakeTypeVariable shakeInfo;


    // Update is called once per frame
    void Update()
    {
        if (!isCharging)
        {
            checkTimer += Time.deltaTime;
        }

        if (animator != null)
        {
            animator.SetFloat("VelocityX", rb.velocity.x * transform.right.normalized.x);
        }
    }

    private void FixedUpdate()
    {
        CheckForTarget();
        CheckForObstacle();
        FlipCheck();
    }

    private void FlipCheck()
    {
        if (isCharging)
        {
            return;
        }

        Vector3 startCast = new Vector2(bc.bounds.center.x, bc.bounds.center.y);
        float offset = (sightLength / 6) + (bc.bounds.size.x / 2);
        Vector3 endCast = new Vector2(bc.bounds.center.x - (transform.right.normalized.x * offset), bc.bounds.center.y);

        RaycastHit2D hit = Physics2D.Linecast(startCast, endCast, targetLayers);

        if (hit.collider != null)
        {
            Flip();
        }
    }

    private void CheckForObstacle()
    {
        if (!isCharging)
        {
            return;
        }

        Vector3 startCast = new Vector2(bc.bounds.center.x, bc.bounds.center.y);
        float offset = obstacleDetectionLength + (bc.bounds.size.x / 2);
        Vector3 endCast = new Vector2(bc.bounds.center.x + (transform.right.normalized.x * offset), bc.bounds.center.y);

        RaycastHit2D hit = Physics2D.Linecast(startCast, endCast, obstacleLayers);

        if (hit.collider != null)
        {
            StartCoroutine(Stop(hit.collider));
        }
    }

    private void CheckForTarget()
    {
        if (isCharging || checkTimer < delayBetweenCharges)
        {
            return;
        }

        Vector3 startCast = new Vector2(bc.bounds.center.x, bc.bounds.center.y);
        Vector3 endCast = new Vector2(bc.bounds.center.x + (transform.right.normalized.x * sightLength) + bc.bounds.size.x / 2, bc.bounds.center.y);

        RaycastHit2D hit = Physics2D.Linecast(startCast, endCast, targetLayers);

        if (hit.collider != null)
        {
            StartCoroutine(Charge(hit.collider.transform.position));
        }
    }

    private IEnumerator Charge(Vector3 target)
    {
        isCharging = true;
        spriteRenderer.color = Color.red;

        float dirX = (target - transform.position).normalized.x;
        float current = 0;
        float moveBackDuration = 1.15f;

        while (current <= 1)
        {
            current += Time.deltaTime / moveBackDuration;
            var dir = (transform.position * (dirX * -1)).normalized;
            rb.velocity = new Vector2(dir.x, rb.velocity.y);

            yield return null;
        }

        rb.velocity = Vector2.zero;

        yield return new WaitForSeconds(0.1f);

        spriteRenderer.color = new Color(1, 1, 1, 1);
        rb.velocity = new Vector2(speed * dirX, rb.velocity.y);
    }

    IEnumerator Stop(Collider2D collider)
    {
        animator.SetTrigger("IsHit");
        if (rb.velocity.magnitude == 0)
        {
            yield break;
        }
        // print("rb.velocity.magnitude " + rb.velocity.magnitude);

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
        
        isCharging = false;
        checkTimer = 0;
    }

    private void Flip()
    {
        transform.Rotate(0f, 180f, 0f);
    }

    void OnDrawGizmos()
    {
        if (bc != null)
        {
            if (isCharging)
            {
                float offset = obstacleDetectionLength + (bc.bounds.size.x / 2);
                Gizmos.color = Color.red;
                Gizmos.DrawLine(
                    new Vector2(bc.bounds.center.x, bc.bounds.center.y),
                    new Vector2(bc.bounds.center.x + (transform.right.normalized.x * offset), bc.bounds.center.y)
                );
            }
            else
            {
                Gizmos.color = Color.blue;
                Gizmos.DrawLine(
                    new Vector2(bc.bounds.center.x, bc.bounds.center.y),
                    new Vector2(bc.bounds.center.x + (transform.right.normalized.x * sightLength) + (bc.bounds.size.x / 2), bc.bounds.center.y)
                );

                Gizmos.color = Color.magenta;
                float offset = (sightLength / 6) + (bc.bounds.size.x / 2);
                Gizmos.DrawLine(
                    new Vector2(bc.bounds.center.x, bc.bounds.center.y),
                    new Vector2(bc.bounds.center.x - (transform.right.normalized.x * offset), bc.bounds.center.y)
                );
            }
            // new Vector2(bc.bounds.min.x + (sightLength / 6), bc.bounds.center.y)
        }
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
