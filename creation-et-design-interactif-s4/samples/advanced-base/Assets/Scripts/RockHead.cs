using UnityEngine;
using System.Collections;
using System.Linq;

public class RockHead : MonoBehaviour
{
    public Rigidbody2D rb;
    public BoxCollider2D bc;

    public float speed;

    private Vector3 destination;

    public RockHeadTrigger[] listTriggers;
    public float delayBetweenMoves;

    private int currentIndex = 0;

    public Animator animator;
    private string lastAnimationPlayed = "";

    public CameraShakeEventChannelSO cameraShake;
    public ShakeTypeVariable shakeInfo;

    private bool isOnScreen = false;

    public Collider2D[] listContacts;
    public LayerMask listContactsLayers;

    public float crushDistance = 0.55f;

    void Start()
    {
        EnableTriggers();
        SetTriggersSibling();
        StartCoroutine(GoToTrigger(listTriggers[currentIndex].transform.position));
    }

    void EnableTriggers()
    {
        for (int i = 0; i < listTriggers.Length; i++)
        {
            listTriggers[i].gameObject.SetActive(i == currentIndex);
        }
    }

    void SetTriggersSibling()
    {
        for (int i = 0; i < listTriggers.Length; i++)
        {
            listTriggers[i].sibling = gameObject;
        }
    }

    private void FixedUpdate()
    {
        rb.AddForce(destination * speed, ForceMode2D.Impulse);

        listContacts = HasLeftContact();
        Collider2D[] player = listContacts.Where(item => item.transform.CompareTag("Player")).ToArray();

        if (listContacts.Length == 2 && player.Length > 0)
        {
            PlayerHealth playerHealth = player[0].transform.GetComponent<PlayerHealth>();
            PlayerContacts playerContacts = player[0].transform.GetComponent<PlayerContacts>();
            if (playerContacts.hasLeftRightCrushContact)
            {
                playerHealth.TakeDamage(float.MaxValue);
            }
        }
    }

    public void ChangeTrigger()
    {
        currentIndex = (currentIndex + 1) % listTriggers.Length;
        EnableTriggers();
        StartCoroutine(GoToTrigger(listTriggers[currentIndex].transform.position));
    }

    IEnumerator GoToTrigger(Vector2 dir)
    {
        yield return new WaitForSeconds(delayBetweenMoves);
        destination = -((Vector2)transform.position - dir).normalized;
        destination.x = Mathf.Round(destination.x);
        destination.y = Mathf.Round(destination.y);

        if (destination.x == 0)
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
        }
        else
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezeRotation;
        }
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        ContactPoint2D[] contacts = new ContactPoint2D[1];
        other.GetContacts(contacts);

        if (other.gameObject.CompareTag("Player"))
        {
            // DetectCollision(other);
            if (contacts[0].normal.y < -0.5f)
            {
                other.gameObject.transform.parent = transform;
            }
        }
    }

    private void OnCollisionStay2D(Collision2D other)
    {
        if (rb.velocity == Vector2.zero)
        {
            if (destination.y > 0 && lastAnimationPlayed != "HitTop")
            {
                OnCrush("HitTop");
            }
            else if (destination.y < 0 && lastAnimationPlayed != "HitBottom")
            {
                OnCrush("HitBottom");
            }
            if (destination.x > 0 && lastAnimationPlayed != "HitRight")
            {
                OnCrush("HitRight");
            }
            else if (destination.x < 0 && lastAnimationPlayed != "HitLeft")
            {
                OnCrush("HitLeft");
            }
        }
    }

    void OnCrush(string side)
    {
        animator.SetBool("Blinking", false);
        animator.SetTrigger(side);
        lastAnimationPlayed = side;
        if (isOnScreen)
        {
            cameraShake?.Raise(shakeInfo);
        }
        EnableTriggers();
    }

    void OnCollisionExit2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            other.gameObject.transform.parent = null;
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



    // public RaycastHit2D[] HasLeftContact()
    // {
    //     return Physics2D.LinecastAll(
    //         new Vector2(bc.bounds.center.x, bc.bounds.min.y + (bc.size.y * 0.10f)),
    //         new Vector2(bc.bounds.min.x - 0.5f, bc.bounds.min.y + (bc.size.y * 0.10f)),
    //         listContactsLayers
    //     );
    // }

    public Collider2D[] HasLeftContact()
    {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.min.x - crushDistance / 2, bc.bounds.center.y),
            new Vector2(crushDistance, bc.size.y * 0.9f),
            0,
            listContactsLayers
        );
    }

    public Collider2D[] HasRightContact()
    {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.max.x + crushDistance / 2, bc.bounds.center.y),
            new Vector2(crushDistance, bc.size.y * 0.9f),
            0,
            listContactsLayers
        );
    }

    private void OnDrawGizmos()
    {
        if (listTriggers[currentIndex])
        {
            Vector3 nextTriggerPosition = new Vector3(
                listTriggers[currentIndex].transform.position.x,
                listTriggers[currentIndex].transform.position.y,
                transform.position.z
            );
            Debug.DrawLine(transform.position, nextTriggerPosition, Color.green);
        }

        if (bc != null)
        {
            Gizmos.color = Color.red;
            Gizmos.DrawLine(
                new Vector2(bc.bounds.center.x, bc.bounds.min.y + (bc.size.y * 0.10f)),
                new Vector2(bc.bounds.min.x - 0.5f, bc.bounds.min.y + (bc.size.y * 0.10f))
            );

            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.min.x - crushDistance / 2, bc.bounds.center.y),
                new Vector2(crushDistance, bc.size.y * 0.9f)
            );
            // Gizmos.color = Color.magenta;
            // Gizmos.DrawLine(
            //     new Vector2(bc.bounds.center.x, bc.bounds.min.y - crushLengthDetection),
            //     new Vector2(bc.bounds.center.x, bc.bounds.max.y + crushLengthDetection)
            // );
        }
    }
}