using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;

public class RockHead : MonoBehaviour
{
    private float range = 100;
    public Rigidbody2D rb;

    public LayerMask listTriggerLayers;
    private Collider2D currentTrigger;

    private List<Vector3> listDirections = new List<Vector3>();

    public float speed;

    private Vector3 destination;

    public GameObject[] listTriggers;
    public float delayBetweenMoves;

    private int currentIndex = 0;

    public Animator animator;
    private string lastAnimationPlayed = "";

    public CameraShakeEventChannelSO onCrushSO;
    public ShakeTypeVariable shakeInfo;

    private bool isOnScreen = false;

    [Header("Manage directions where the GameObject can looking for specific layers")]
    public bool checkRight = true;
    public bool checkLeft = true;
    public bool checkTop = true;
    public bool checkBottom = true;

    private bool isATrigger;

    // Value for which the go will be considered as crushed if it has contact with a RockHead
    private float maxImpulse = 1000;

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
        EnableTriggers();
        CheckForTriggers();
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
        rb.AddForce(destination * speed, ForceMode2D.Impulse);
    }

    private void CheckForTriggers()
    {
        foreach (var dir in listDirections)
        {
            Vector3 rayDirection = dir * range;
            Debug.DrawRay(transform.position, rayDirection, Color.red);

            //We use "RaycastAll" and not "Raycast" because some triggers might be overlapped
            RaycastHit2D[] listHits = Physics2D.RaycastAll(transform.position, rayDirection, range, listTriggerLayers);

            foreach (var hit in listHits)
            {
                // If it found something...
                if (hit.collider != null && currentTrigger != hit.collider)
                {
                    GameObject go = hit.collider.gameObject;
                    isATrigger = Array.Exists(listTriggers, element => element == go);

                    // ...and it's a trigger of the rockhead, it moves
                    if (isATrigger)
                    {
                        StartCoroutine(ChangeDirection(-hit.normal));
                        currentTrigger = hit.collider;
                    }
                }
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
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        ContactPoint2D[] contacts = new ContactPoint2D[1];
        other.GetContacts(contacts);
        
        if (other.gameObject.CompareTag("Player"))
        {
            DetectCollision(other);
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
            if (animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !animator.IsInTransition(0))
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

        if (other.gameObject.CompareTag("Player"))
        {
            DetectCollision(other);
        }
    }

    void OnCrush(string side)
    {
        animator.SetTrigger(side);
        lastAnimationPlayed = side;
        if (isOnScreen)
        {
            onCrushSO.Raise(shakeInfo);
        }
        EnableTriggers();
        CheckForTriggers();
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
        ContactPoint2D[] contacts = new ContactPoint2D[other.contactCount];
        other.GetContacts(contacts);

        foreach (ContactPoint2D contact in contacts)
        {
            if (
                (
                contact.normal.y > 0.5 ||
                contact.normal.y < -0.5 ||
                contact.normal.x < -0.5 ||
                contact.normal.x > 0.5
                ) &&
                contact.normalImpulse > maxImpulse &&
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