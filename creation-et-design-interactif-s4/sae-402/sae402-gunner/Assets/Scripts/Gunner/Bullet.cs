using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    [SerializeField]
    private float _moveSpeed;

    private Rigidbody2D _rb;
    // Start is called before the first frame update

    void Awake()
    {
        // transform.localScale = new Vector3(5.7f, 5.7f, 5.7f);
        // _rb = GetComponent<Rigidbody2D>();
        // transform.localScale = transform.parent.transform.localScale;
    }
    void Start()
    {
        //  _moveSpeed = 0.02f;
         _moveSpeed = 20.0f;
        _rb.velocity = transform.right * _moveSpeed;
        // On veut que la balle se détruise d'elle-même 5 secondes après avoir été tirée
        Destroy(gameObject, 3f);
    }

    // Update is called once per frame
    void Update()
    {

        // _rb.velocity = transform.right * _moveSpeed;
        transform.Translate(Vector3.right * Time.deltaTime * _moveSpeed);
    }

    void OnCollisionEnter2D(Collision2D collision)
    {
        Debug.Log(collision.contacts[0].normal.x);
        // Destroy(gameObject);
    }

    void OnTriggerEnter2D(Collider2D collider) {
        Debug.Log("fefefe");
    }

    void ShowStream()
    {

    }
}
