using UnityEngine;
using System.Collections.Generic;

public class MountBehavior : MonoBehaviour
{
    private ContactPoint2D[] listContacts = new ContactPoint2D[1];
    public FixedJoint2D fixedJoint2D;

    private void OnCollisionEnter2D(Collision2D other)
    {
        other.GetContacts(listContacts);

        if (
           other.gameObject.CompareTag("Player") &&
           listContacts[0].normal.y < -0.5f
           )
        {
            Rigidbody2D playerRb = other.gameObject.GetComponent<Rigidbody2D>();
            fixedJoint2D.connectedBody = playerRb;
            GetComponent<Rigidbody2D>().mass = playerRb.mass;
            transform.SetParent(other.gameObject.transform);
        }
    }
}
