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
    [Tooltip("Delay between moves in seconds")]
    public float delayBetweenMoves;

    private int currentIndex = 0;

    public Animator animator;
    private string lastAnimationPlayed = "";

    public CameraShakeEventChannel cameraShake;
    public ShakeTypeVariable shakeInfo;

    private bool isOnScreen = false;

    private Collider2D[] listContacts;
    public LayerMask listContactsLayers;

    public float crushDistance = 0.55f;


    private float detectScale = 0.95f;

    private enum Movement
    {
        VerticalPositive,
        VerticalNegative,
        HorizontalNegative,
        HorizontalPositive,
    }

    private float crushThreshold = 10;

    private Movement currentMovement;

    void Start()
    {
        Vector2 firstTriggerPosition = listTriggers[currentIndex].transform.position;

        Vector2 currentDestination = -((Vector2)transform.position - firstTriggerPosition).normalized;
        currentDestination.x = Mathf.Round(currentDestination.x);
        currentDestination.y = Mathf.Round(currentDestination.y);

        currentMovement = GetNextDirection(currentDestination);
        EnableTriggers();
        SetTriggersSibling();
        StartCoroutine(GoToTrigger(firstTriggerPosition));
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
            listTriggers[i].rockHead = gameObject;
        }
    }

    private void FixedUpdate()
    {
        rb.AddForce(destination * speed, ForceMode2D.Impulse);

        Crush();
    }

    private void Crush()
    {
        switch (currentMovement)
        {
            case Movement.HorizontalNegative:
                listContacts = HasLeftContact();
                break;
            case Movement.HorizontalPositive:
                listContacts = HasRightContact();
                break;
            case Movement.VerticalNegative:
                listContacts = HasBottomContact();
                break;
            case Movement.VerticalPositive:
                listContacts = HasTopContact();
                break;
        }

        Collider2D[] player = listContacts.Where(item => item.transform.CompareTag("Player")).ToArray();

        if (listContacts.Length > 0 && rb.velocity.sqrMagnitude > crushThreshold)
        {
            if (player.Length == 0 || (player.Length > 0 && listContacts.Length > 1))
            {
                CrushAnimation();
            }

            if (player.Length > 0)
            {
                PlayerContacts playerContacts = player[0].transform.GetComponent<PlayerContacts>();

                if (
                    (currentMovement == Movement.VerticalPositive && playerContacts.HasTopContact()) ||
                    (currentMovement == Movement.VerticalNegative && playerContacts.HasBottomContact()) ||
                    (currentMovement == Movement.HorizontalNegative && playerContacts.HasLeftContact()) ||
                    (currentMovement == Movement.HorizontalPositive && playerContacts.HasRightContact())
                )
                {
                    PlayerHealth playerHealth = player[0].transform.GetComponent<PlayerHealth>();
                    playerHealth.TakeDamage(float.MaxValue);
                }
            }
        }
    }

    public void ChangeTrigger()
    {
        currentIndex = (currentIndex + 1) % listTriggers.Length;
        EnableTriggers();
        StartCoroutine(GoToTrigger(listTriggers[currentIndex].transform.position));
    }

    private IEnumerator GoToTrigger(Vector2 dir)
    {
        yield return new WaitForSeconds(delayBetweenMoves);
        destination = -((Vector2)transform.position - dir).normalized;
        destination.x = Mathf.Round(destination.x);
        destination.y = Mathf.Round(destination.y);
        currentMovement = GetNextDirection(destination);

        if (destination.x == 0)
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
        }
        else
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezeRotation;
        }
    }

    Movement GetNextDirection(Vector3 dir)
    {
        Movement tmpMovement = Movement.HorizontalPositive;

        if (dir.x > 0)
        {
            tmpMovement = Movement.HorizontalPositive;
        }
        else if (dir.x < 0)
        {
            tmpMovement = Movement.HorizontalNegative;
        }
        else if (dir.y > 0)
        {
            tmpMovement = Movement.VerticalPositive;
        }
        else if (dir.y < 0)
        {
            tmpMovement = Movement.VerticalNegative;
        }

        return tmpMovement;
    }

    private void CrushAnimation()
    {
        if (rb.velocity.sqrMagnitude <= 0)
        {
            return;
        }

        if (currentMovement == Movement.VerticalPositive && lastAnimationPlayed != "HitTop")
        {
            OnCrush("HitTop");
        }
        else if (currentMovement == Movement.VerticalNegative && lastAnimationPlayed != "HitBottom")
        {
            OnCrush("HitBottom");
        }
        if (currentMovement == Movement.HorizontalPositive && lastAnimationPlayed != "HitRight")
        {
            OnCrush("HitRight");
        }
        else if (currentMovement == Movement.HorizontalNegative && lastAnimationPlayed != "HitLeft")
        {
            OnCrush("HitLeft");
        }
    }

    void OnCrush(string side)
    {
        animator.SetBool("Blinking", false);
        animator.SetTrigger(side);
        lastAnimationPlayed = side;
        if (isOnScreen)
        {
            cameraShake.Raise(shakeInfo);
        }
        EnableTriggers();
    }

    void OnBecameInvisible()
    {
        isOnScreen = false;
    }

    void OnBecameVisible()
    {
        isOnScreen = true;
    }

    public Collider2D[] HasLeftContact()
    {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.min.x - crushDistance / 2, bc.bounds.center.y),
            new Vector2(crushDistance, bc.size.y * detectScale),
            0,
            listContactsLayers
        );
    }

    public Collider2D[] HasRightContact()
    {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.max.x + crushDistance / 2, bc.bounds.center.y),
            new Vector2(crushDistance, bc.size.y * detectScale),
            0,
            listContactsLayers
        );
    }

    public Collider2D[] HasTopContact()
    {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.max.y + crushDistance / 2),
            new Vector2(bc.size.x * detectScale, crushDistance),
            0,
            listContactsLayers
        );
    }

    public Collider2D[] HasBottomContact()
    {
        return Physics2D.OverlapBoxAll(
            new Vector2(bc.bounds.center.x, bc.bounds.min.y - crushDistance / 2),
            new Vector2(bc.size.x * detectScale, crushDistance),
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

            switch (currentMovement)
            {
                case Movement.HorizontalNegative:
                    Gizmos.DrawWireCube(
                        new Vector2(bc.bounds.min.x - crushDistance / 2, bc.bounds.center.y),
                        new Vector2(crushDistance, bc.size.y * detectScale)
                    );
                    break;
                case Movement.HorizontalPositive:
                    Gizmos.DrawWireCube(
                            new Vector2(bc.bounds.max.x + crushDistance / 2, bc.bounds.center.y),
                            new Vector2(crushDistance, bc.size.y * detectScale)
                        );
                    break;
                case Movement.VerticalNegative:
                    Gizmos.DrawWireCube(
                        new Vector2(bc.bounds.center.x, bc.bounds.min.y - crushDistance / 2),
                        new Vector2(bc.size.x * detectScale, crushDistance)
                    );
                    break;
                case Movement.VerticalPositive:
                    Gizmos.DrawWireCube(
                        new Vector2(bc.bounds.center.x, bc.bounds.max.y + crushDistance / 2),
                        new Vector2(bc.size.x * detectScale, crushDistance)
                    );
                    break;
            }
        }
    }
}