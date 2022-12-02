using UnityEngine;
using System.Collections;

public class RockHead2 : MonoBehaviour
{
    private float range = 100;
    public Rigidbody2D rb;

    public LayerMask listTriggerLayers;
    private Collider2D currentTrigger;

    private Vector3[] listDirections = new Vector3[4];

    public float speed;

    private Vector3 destination;

    public GameObject[] listTriggers;
    private float delayBetweenMoves = 1.2f;

    private int currentIndex = 0;
    private int directionChecked = 0;

    public Animator animator;

    // Start is called before the first frame update
    void Start()
    {
        EnableTriggers();
        Debug.Log("currentIndex " + currentIndex);
        listDirections[0] = transform.right * range; // Right direction
        listDirections[1] = -transform.right * range; // Left direction
        listDirections[2] = transform.up * range; // Up direction
        listDirections[3] = -transform.up * range; // Down direction
    }

    private void Update() {
        if(Input.GetKeyDown(KeyCode.N)) {
            CheckForTriggers();
            Debug.Log(rb.velocity);
        }
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
        // Check in all directions if detects trigger 
        for (int i = 0; i < listDirections.Length; i++)
        {
            directionChecked = (directionChecked + 1) % listTriggers.Length;
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
    }

    private void OnCollisionStay2D(Collision2D other)
    {
        if (rb.velocity == Vector2.zero)
        {
            if (animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !animator.IsInTransition(0))
            {
                if (destination.y > 0)
                {
                    animator.SetTrigger("HitTop");
                }
                else if (destination.y < 0)
                {
                    animator.SetTrigger("HitBottom");
                }

                if (destination.x > 0)
                {
                    animator.SetTrigger("HitRight");
                }
                else if (destination.x < 0)
                {
                    animator.SetTrigger("HitLeft");
                }
            }
            CheckForTriggers();
        }
    }
}
