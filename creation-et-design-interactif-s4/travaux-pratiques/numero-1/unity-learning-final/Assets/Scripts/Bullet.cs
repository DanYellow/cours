using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float speed = 20f;
    public Rigidbody2D rb;

    public GameObject impactEffect;

    // Start is called before the first frame update
    void Start()
    {
        rb.velocity = transform.right * speed;
        Destroy(gameObject, 2.5f);
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if(!other.CompareTag("Player")) {
            GameObject impactEffectClone = Instantiate(impactEffect, transform.position, transform.rotation);
            Destroy (impactEffectClone, impactEffectClone.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).length);

            Destroy(gameObject);
        }
    }


}
