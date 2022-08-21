using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    [SerializeField]
    private float _moveSpeed = 100.0f;
    // Start is called before the first frame update

    void Awake()
    {
        transform.localScale = new Vector3(5.7f, 5.7f, 5.7f);
        // GetComponent<Rigidbody2D>().enabled = false;
        // transform.localScale = transform.parent.transform.localScale;
    }
    void Start()
    {
        // On veut que la balle se détruise d'elle-même 5 secondes après avoir été tirée
        Destroy(gameObject, 5f);
    }

    // Update is called once per frame
    void Update()
    {
        // transform.Translate(Vector3.left * Time.deltaTime * _moveSpeed);
    }

    void OnCollisionEnter2D(Collision2D collision) {
        // Debug.Log(collision.contacts[0].normal.x);
        // Destroy(gameObject);
    }

    void ShowStream(){

    }
}
