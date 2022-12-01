using System.Linq;
using UnityEngine;

public class RockHead : MonoBehaviour
{
    public float speed = 0.10f;
    public float range = 5f;
    public LayerMask listGroundLayers;

    public Rigidbody2D rb;

    public float checkRadius = 0.05f;

    public Transform[] listChecks;


    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if(Input.GetKeyDown(KeyCode.N)) {
            rb.AddForce(transform.right * speed);
            // rb.velocity = new Vector2(1 * speed, rb.velocity.y);
            foreach (var x in listChecks.Select(x => IsContact(x)).ToArray())
        {
            Debug.Log(x);
        }
            // Debug.Log();
        }
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        //         foreach( var x in other.contacts) {
        //  Debug.Log( x.normal);
        // }
        if (other.contacts[0].normal.y < -0.5f)
        {

        }
    }

    // private void OnCollisionStay2D(Collision2D other)
    // {
    //     foreach (var x in other.contacts)
    //     {
    //         Debug.Log(x.normal);
    //     }
    // }

    private bool IsContact(Transform t)
    {
        return Physics2D.OverlapCircle(t.position, checkRadius, listGroundLayers);
    }

    void OnDrawGizmosSelected()
    {
        foreach (Transform t in listChecks) {
            Gizmos.DrawWireSphere(t.position, checkRadius);
        }
    }
}
