using System.Collections;
using UnityEngine;

/**
* @description Allow any Gameobject to look towards another one according to a distance threshold
**/
public class FallingPlatform : MonoBehaviour
{
    [Tooltip("Delay before the platform starts to fall")]
    public float fallDelay = 1.5f;
    private float destroyDelay = 3f;
    private Vector2 startPosition = Vector2.zero;


    public Rigidbody2D rb;

    public Animator animator;

    public ParticleSystem particleEmitter;

    private void Start()
    {
        startPosition = transform.position;
    }

    private void OnCollisionEnter2D(Collision2D collision)
    {
        collision.transform.SetParent(transform);
        if (collision.gameObject.CompareTag("Player"))
        {
            collision.gameObject.GetComponent<PlayerMovement>().isOnFallingPlatform = true;
            animator.speed = 0.5f;
            StartCoroutine(Fall());
        }
    }

    private void OnCollisionExit2D(Collision2D collision)
    {
        collision.transform.SetParent(null);
        if (collision.gameObject.CompareTag("Player"))
        {
            collision.gameObject.GetComponent<PlayerMovement>().isOnFallingPlatform = false;
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
        Invoke(nameof(Activate), destroyDelay * 1.5f);
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
