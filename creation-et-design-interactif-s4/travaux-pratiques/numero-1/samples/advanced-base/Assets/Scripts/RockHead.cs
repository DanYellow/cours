using System.Linq;
using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class RockHead : MonoBehaviour
{
    public float speed = 0.10f;
    public LayerMask listGroundLayers;

    public Rigidbody2D rb;

    public float checkRadius = 0.25f;

    public Transform[] listChecks;

    private Vector3[] directions = new Vector3[4];

    [SerializeField]
    private int currentIndex = 0;

    [SerializeField]
    private string currentList = "";


    // Start is called before the first frame update
    void Start()
    {
        directions[0] = transform.right;//Left direction
        directions[1] = transform.up;//Right direction
        directions[2] = -transform.right;   //Up direction
        directions[3] = -transform.up;   //Down direction
    }

    // Update is called once per frame
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.N))
        {
            // Debug.Log("Test " + string.Join(", ", listChecks.Select(x => IsContact(x)).ToArray()));
            // rb.AddForce(-transform.right * speed);

            Debug.Log("Debug " + string.Join(", ", listChecks.Select(x => IsContact(x)).ToArray()));
            Debug.Log("currentIndex " + currentIndex);
            Debug.Log("directions " + directions[currentIndex]);
            Debug.Log("rb.velocity " + rb.velocity);
            Debug.Log("rb " + (rb.velocity == Vector2.zero));
            Debug.Log("string " + (currentList != string.Join(", ", listChecks.Select(x => IsContact(x)).ToArray())));
        }
    }

    void FixedUpdate()
    {
        if (rb.velocity == Vector2.zero && currentList != string.Join(", ", listChecks.Select(x => IsContact(x)).ToArray()))
        {
            // 0 : bottom
            // 1 : right
            // 2 : top
            // 3 : left

            // Dont move anymore
            if ((IsContact(listChecks[0]) && IsContact(listChecks[3])) || IsContact(listChecks[2]) && IsContact(listChecks[1]))
            {
                rb.constraints = RigidbodyConstraints2D.FreezePositionY | RigidbodyConstraints2D.FreezeRotation;
            }
            else if ((IsContact(listChecks[0]) && IsContact(listChecks[1])) || IsContact(listChecks[2]) && IsContact(listChecks[3]))
            {
                rb.constraints = RigidbodyConstraints2D.FreezePositionX | RigidbodyConstraints2D.FreezeRotation;
            }
            
            rb.AddForce(directions[currentIndex] * speed);
            StartCoroutine(ChangeDirection());
        }
    }

    IEnumerator ChangeDirection()
    {
        yield return new WaitForSeconds(2f);
        currentList = string.Join(", ", listChecks.Select(x => IsContact(x)).ToArray());
        currentIndex = (currentIndex + 1) % directions.Length;

    }

    private bool IsContact(Transform t)
    {
        return Physics2D.OverlapCircle(t.position, checkRadius, listGroundLayers);
    }

    void OnDrawGizmosSelected()
    {
        foreach (Transform t in listChecks)
        {
            Gizmos.DrawWireSphere(t.position, checkRadius);
        }
    }
}
