using System.Collections;
using UnityEngine;

/**
* @description Allow any Gameobject to look towards another one according to a distance threshold
**/
public class FallingPlatform : MonoBehaviour
{
    private float fallDelay = 1f;
    private float destroyDelay = 2f;
    private Vector2 startPosition = Vector2.zero;

    [SerializeField] private Rigidbody2D rb;
    [SerializeField] private Animator animator;

    private void Start()
    {
        startPosition = transform.position;
    }


    private void OnCollisionEnter2D(Collision2D collision)
    {
        if (collision.gameObject.CompareTag("Player"))
        {
            animator.speed = 0.5f;
            StartCoroutine(Fall());
        }
    }

    private IEnumerator Fall()
    {
        yield return new WaitForSeconds(fallDelay);
        animator.SetTrigger("Fall");
        rb.bodyType = RigidbodyType2D.Dynamic;
        StartCoroutine(Reset());
    }

    private IEnumerator Reset()
    {
        yield return new WaitForSeconds(destroyDelay);
        Invoke(nameof(Activate), destroyDelay);
        gameObject.SetActive(false);
        animator.ResetTrigger("Fall");
        animator.speed = 1;
        transform.position = startPosition;
        rb.bodyType = RigidbodyType2D.Kinematic;
    }

    void Activate()
    {
        gameObject.SetActive(true);
    }
}
