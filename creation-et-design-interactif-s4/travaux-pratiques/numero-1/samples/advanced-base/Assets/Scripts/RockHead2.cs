using UnityEngine;
using System.Collections;

public class RockHead2 : MonoBehaviour
{
    private Vector3[] directions = new Vector3[4];
    public float range = 100;
    public Rigidbody2D rb;

    private Color[] listColors = new Color[4];
    public LayerMask listGroundLayers;
    [SerializeField] private float speed;

    private Vector3 destination;

    public GameObject[] listTriggers;
    private float delayBetweenMoves = 1.2f;

    public int currentIndex = 0;

    public Animator animator;

    public Vector2 prevVelocity;

    // Start is called before the first frame update
    void Start()
    {
        EnableTriggers();
    }

    void EnableTriggers()
    {
        for (int i = 0; i < listTriggers.Length; i++)
        {
            listTriggers[i].SetActive(i == currentIndex);
        }
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.N))
        {
            Logger();
        }
    }

    private void FixedUpdate()
    {
        CheckForPlayer();
        rb.AddForce(destination * speed, ForceMode2D.Impulse);

    }

    void Logger()
    {
        Debug.Log("rb " + rb.velocity);
        Debug.Log("Testtttt " + destination);
        Debug.Log("currentIndex " + currentIndex);
    }

    private void CheckForPlayer()
    {
        CalculateDirections();

        //Check if spikehead sees player in all 4 directions
        for (int i = 0; i < directions.Length; i++)
        {
            Debug.DrawRay(transform.position, directions[i], Color.red);
            RaycastHit2D hit = Physics2D.Raycast(transform.position, directions[i], range, listGroundLayers);
            if (hit.collider != null && rb.velocity == Vector2.zero)
            {
                prevVelocity = rb.velocity;
                StartCoroutine(ChangeDirection(i));
            }
        }
    }

    IEnumerator ChangeDirection(int i)
    {
        yield return new WaitForSeconds(delayBetweenMoves);
        destination = directions[i];
        currentIndex = i;

        if (i == 0 || i == 2)
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
        }
        else
        {
            rb.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezeRotation;
        }

        EnableTriggers();
    }

    private void CalculateDirections()
    {
        directions[1] = transform.right * range; //Right direction
        directions[3] = -transform.right * range; //Left direction
        directions[2] = transform.up * range; //Up direction
        directions[0] = -transform.up * range; //Down direction

        // directions[0] = transform.right * range; //Right direction
        // directions[1] = -transform.right * range; //Left direction
        // directions[2] = transform.up * range; //Up direction
        // directions[3] = -transform.up * range; //Down direction
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        // if ((this.transform.position.x - other.collider.transform.position.x) < 0) {
        //         print("hit left 2");
        //     } else if ((this.transform.position.x - other.collider.transform.position.x) > 0) {
        //         print("hit right 2");
        //     }

        // if(other.transform.position.y < transform.position.y) {
        //     animator.SetTrigger("HitTop");
        // }

        // if(other.transform.position.y > transform.position.y) {
        //     animator.SetTrigger("HitBottom");
        // }

        // Debug.Log("fff " + (other.transform.position.x < transform.position.x));
        // if(other.transform.position.x < transform.position.x) {
        //     animator.SetTrigger("LeftTop");
        // }

        // if(other.transform.position.x > transform.position.x) {
        //     animator.SetTrigger("RightTop");
        // }
        // ContactPoint2D[] contacts = new ContactPoint2D[4];

        // Debug.Log("Contact " + other.contacts.Length);
        // print("contactCount " + other.contactCount);
        // Debug.Log("top " + other.GetContacts(contacts));
        // Debug.Log("top " + (other.contacts[0].normal.y > -0.5f));
        // Debug.Log("Bottom " + (other.contacts[0].normal.y < 0.5f));
        // Debug.Log("Left " + (other.contacts[0].normal.x > -0.5f));
        // Debug.Log("Right " + (other.contacts[0].normal.x > -0.5f));

    }

    private void OnCollisionStay2D(Collision2D other) {
        if(rb.velocity == Vector2.zero && animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !animator.IsInTransition(0)){
            Debug.Log("Stopped " + destination);

            if(destination.y > 0) {
                animator.SetTrigger("HitTop");
                Debug.Log("top ");
            } else if (destination.y < 0) {
                Debug.Log("bottom");
                animator.SetTrigger("HitBottom");
            }

            if(destination.x > 0) {
                Debug.Log("right ");
                animator.SetTrigger("HitRight");
            } else if (destination.x < 0) {
                Debug.Log("left");
                animator.SetTrigger("HitLeft");
            }
        }
        // if(rb.velocity == Vector2.zero && animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1){
        //     if(other.contacts[0].normal.x < -0.5f) {
        //         animator.SetTrigger("HitBottom");
        //     } else if(other.contacts[0].normal.x > 0.5f) {
        //         animator.SetTrigger("HitTop");
        //     }

        //     if(other.contacts[0].normal.y < -0.5f) {
        //         animator.SetTrigger("HitLeft");
        //     } else if(other.contacts[0].normal.y > 0.5f) {
        //         animator.SetTrigger("HitRight");
        //     }
        //     // Debug.Log("normal.y " + other.contacts[0].normal.y);
        //     // Debug.Log("normal.x " + other.contacts[0].normal.x);
        //     // if ((this.transform.position.x - other.collider.transform.position.x) < 0) {
        //     //     print("hit left");
        //     // } else if ((this.transform.position.x - other.collider.transform.position.x) > 0) {
        //     //     print("hit right");
        //     // }
        // }

        
    }

    // private void OnTriggerExit2D(Collider2D other) {
    //     Debug.Log("OnTriggerExit2D");
    // }
}
