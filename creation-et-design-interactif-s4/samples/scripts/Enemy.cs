using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    public ContactPoint2D[] listContacts = new ContactPoint2D[1];
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private void OnCollisionEnter2D(Collision2D other) {
        if(other.gameObject.CompareTag("Player")) {
            other.GetContacts(listContacts);
            // The player jumped on the top of the ennemy
            if(listContacts[0].normal.y < -0.5f) {
                Destroy(gameObject);
            } else {
                PlayerHealth playerHealth = other.gameObject.GetComponent<PlayerHealth>();
                playerHealth.Hurt(1);
            }
        }
    }
}
