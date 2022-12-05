using UnityEngine;
using System.Collections;

public class RockHead : MonoBehaviour
{
    private float range = 100;
    public Rigidbody2D rb;

    public LayerMask listTriggerLayers;
    private Collider2D currentTrigger;

    private Vector3[] listDirections = new Vector3[4];

    public float speed;

    private Vector3 destination;

    public GameObject[] listTriggers;
    public float delayBetweenMoves;

    private int currentIndex = 0;

    public Animator animator;
    private string lastAnimationPlayed = "";

    public VoidEventChannelSO OnCrushSO;

    private bool isOnScreen = false;

    // Start is called before the first frame update
    void Start()
    {
        EnableTriggers();
        listDirections[0] = transform.right * range; // Right direction
        listDirections[1] = -transform.right * range; // Left direction
        listDirections[2] = transform.up * range; // Up direction
        listDirections[3] = -transform.up * range; // Down direction
    }

    void EnableTriggers()
    {
        for (int i = 0; i < listTriggers.Length; i++)
        {
            listTriggers[i].SetActive(i == currentIndex);
        }
    }
    private void FixedUpdate()
    {
        CheckForTriggers();
        rb.AddForce(destination * speed, ForceMode2D.Impulse);
    }

    private void CheckForTriggers()
    {
        // Check in all directions if detects any trigger 
        for (int i = 0; i < listDirections.Length; i++)
        {
            Debug.DrawRay(transform.position, listDirections[i], Color.red);
            RaycastHit2D hit = Physics2D.Raycast(transform.position, listDirections[i], range, listTriggerLayers);
            if (hit.collider != null && rb.velocity == Vector2.zero && currentTrigger != hit.collider)
            {
                StartCoroutine(ChangeDirection(-hit.normal));
                currentTrigger = hit.collider;
            }
        }
    }

    IEnumerator ChangeDirection(Vector2 dir)
    {
        yield return new WaitForSeconds(delayBetweenMoves);
        destination = dir;
        currentIndex = (currentIndex + 1) % listTriggers.Length;
        if (dir.x == 0)
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
        }
        else
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezeRotation;
        }
        EnableTriggers();
        CheckForTriggers();
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            DetectCollision(other);
        }

        if (other.contacts[0].normal.y < -0.5f)
        {
            other.gameObject.transform.parent = transform;
        }
    }

    private void OnCollisionStay2D(Collision2D other)
    {
        if (rb.velocity == Vector2.zero)
        {
            if (animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !animator.IsInTransition(0))
            {
                if (destination.y > 0 && lastAnimationPlayed != "HitTop")
                {
                    animator.SetTrigger("HitTop");
                    lastAnimationPlayed = "HitTop";
                    if (isOnScreen)
                    {
                        OnCrushSO.Raise();
                    }
                }
                else if (destination.y < 0 && lastAnimationPlayed != "HitBottom")
                {
                    animator.SetTrigger("HitBottom");
                    lastAnimationPlayed = "HitBottom";
                    if (isOnScreen)
                    {
                        OnCrushSO.Raise();
                    }
                }
                if (destination.x > 0 && lastAnimationPlayed != "HitRight")
                {
                    lastAnimationPlayed = "HitRight";
                    animator.SetTrigger("HitRight");
                    if (isOnScreen)
                    {
                        OnCrushSO.Raise();
                    }
                }
                else if (destination.x < 0 && lastAnimationPlayed != "HitLeft")
                {
                    lastAnimationPlayed = "HitLeft";
                    animator.SetTrigger("HitLeft");

                    if (isOnScreen)
                    {
                        OnCrushSO.Raise();
                    }
                }

            }
        }

        if (other.gameObject.CompareTag("Player"))
        {
            DetectCollision(other);
        }
    }

    void OnCollisionExit2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            other.gameObject.transform.parent = null;
        }
    }

    private void DetectCollision(Collision2D other)
    {
        ContactPoint2D[] contacts = new ContactPoint2D[10];
        other.GetContacts(contacts);

        foreach (ContactPoint2D contact in contacts)
        {
            if (
                ((contact.normal.y > 0.5 && contact.normalImpulse > 1000) ||
                (contact.normal.y < -0.5 && contact.normalImpulse > 1000) ||
                (contact.normal.x < -0.5 && contact.normalImpulse > 1000) ||
                (contact.normal.x > 0.5 && contact.normalImpulse > 1000)) &&
                other.gameObject.TryGetComponent<PlayerHealth>(out PlayerHealth health)
            )
            {
                other.gameObject.transform.parent = null;
                health.TakeDamage(float.MaxValue);
            }
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
