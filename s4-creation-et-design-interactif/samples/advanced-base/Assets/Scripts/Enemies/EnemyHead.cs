using System.Collections;
using UnityEngine;

public class EnemyHead : MonoBehaviour
{
    private bool isHit = false;

    [SerializeField] private FloatVariable bounceForce;

    [SerializeField] Collider2D headCollider;


    private void OnTriggerEnter2D(Collider2D other)
    {
        if (!other.CompareTag("Player")) return;
        if (isHit) return;

        Rigidbody2D rb = other.attachedRigidbody; //Better in physics callbacks

        if (rb.linearVelocityY <= 0f)
        {
            rb.linearVelocity = new Vector2(rb.linearVelocity.x, 0f);
            other.GetComponent<PlayerMovement>().ResetCoyoteTime();
            rb.AddForce(Vector2.up * bounceForce.CurrentValue, ForceMode2D.Impulse);

            IHurtable[] listHurtables = GetComponentsInParent<IHurtable>();

            foreach (var component in listHurtables)
            {
                component.Hurt();
            }

            if (gameObject.activeSelf)
            {
                StartCoroutine(HitCooldown());
            }
        }
    }

    private IEnumerator HitCooldown()
    {
        isHit = true;
        yield return new WaitForSeconds(0.1f);
        isHit = false;
    }
}
