using UnityEngine;
using System.Collections;

public class RockHead2 : MonoBehaviour
{
    private Vector3[] directions = new Vector3[4];
    public float range = 100;
    public Rigidbody2D rb;

    private float _shootingRate;
    private float _nextShootTime = 0f;

    public LayerMask listGroundLayers;
    [SerializeField] private float speed; // 30

    private Vector3 destination;

    public GameObject[] listTriggers;
    public Collider2D currentTrigger;
    private float delayBetweenMoves = 1.2f;

    // [SerializeField, ReadOnlyInspector]
    private int currentIndex = 0;

    public Animator animator;

    // Start is called before the first frame update
    void Start()
    {
        EnableTriggers();
        CheckForTriggers();
        // currentIndex = 0;
    }

    void EnableTriggers()
    {
        for (int i = 0; i < listTriggers.Length; i++)
        {
            listTriggers[i].SetActive(i == currentIndex);
        }
    }

    private void Update() {
        if(Input.GetKeyDown(KeyCode.N)) {
            CheckForTriggers();
        }
    }

    private void FixedUpdate()
    {
        // CheckForTriggers();
        rb.AddForce(destination * speed, ForceMode2D.Impulse);

    }

    private void CheckForTriggers()
    {
        CalculateDirections();

        //Check if spikehead sees player in all 4 directions
        for (int i = 0; i < directions.Length; i++)
        {
            Debug.DrawRay(transform.position, directions[i], Color.red);
            RaycastHit2D hit = Physics2D.Raycast(transform.position, directions[i], range, listGroundLayers);
            if (hit.collider != null && rb.velocity == Vector2.zero && currentTrigger != hit.collider)
            {
                StartCoroutine(ChangeDirection(i, -hit.normal));
                currentTrigger = hit.collider;
                // rb.AddForce(-hit.normal * speed, ForceMode2D.Impulse);
                // currentIndex = currentIndex + 1;
            }
        }
    }

    // public static void DumpToConsole(object obj)
    // {
    //     var output = JsonUtility.ToJson(obj, true);
    //     Debug.Log(output);
    // }

    IEnumerator ChangeDirection(int i, Vector2 dir)
    {
        Debug.Log("currentIndex " + currentIndex);
        yield return new WaitForSeconds(delayBetweenMoves);
        destination = dir;//directions[i];
        currentIndex = (currentIndex + 1) % directions.Length;

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

    private void CalculateDirections()
    {
        // directions[1] = transform.right * range; //Right direction
        // directions[3] = -transform.right * range; //Left direction
        // directions[2] = transform.up * range; //Up direction
        // directions[0] = -transform.up * range; //Down direction

        directions[0] = transform.right * range; //Right direction
        directions[1] = -transform.right * range; //Left direction
        directions[2] = transform.up * range; //Up direction
        directions[3] = -transform.up * range; //Down direction
    }

    private void OnCollisionStay2D(Collision2D other) {
        if(rb.velocity == Vector2.zero){
            if(animator.GetCurrentAnimatorStateInfo(0).normalizedTime > 1 && !animator.IsInTransition(0)) {
                // Debug.Log(destination);
            
            if(destination.y > 0) {
                animator.SetTrigger("HitTop");
            } else if (destination.y < 0) {
                animator.SetTrigger("HitBottom");
            }

            if(destination.x > 0) {
                animator.SetTrigger("HitRight");
            } else if (destination.x < 0) {
                animator.SetTrigger("HitLeft");
            }
            }
            // _nextShootTime = Time.time + _shootingRate;
            CheckForTriggers();
        }
    }
}
