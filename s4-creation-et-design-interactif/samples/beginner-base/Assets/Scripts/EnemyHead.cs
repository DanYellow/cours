using System.Collections;
using UnityEngine;

public class EnemyHead : MonoBehaviour
{
    public float bounceForce = 12f;
    private bool isHit = false;


    private void OnTriggerEnter2D(Collider2D other)
    {
        if (!other.CompareTag("Player")) return;
        if (isHit) return;

        // GetComponent<Rigidbody2D>() : You know the Rigidbody is on the same object
        Rigidbody2D rb = other.attachedRigidbody; // Better in physics callbacks

        if (rb.linearVelocityY <= 0f)
        {
            rb.linearVelocity = new Vector2(rb.linearVelocityX, 0f);
            rb.AddForce(Vector2.up * bounceForce, ForceMode2D.Impulse);
            GetComponentInParent<EnemyAdvanced>().TakeDamage();

            StartCoroutine(HitCooldown());
        }
    }

    private IEnumerator HitCooldown()
    {
        isHit = true;
        yield return new WaitForSeconds(0.1f); // 1-2 frames
        isHit = false;
    }
}
