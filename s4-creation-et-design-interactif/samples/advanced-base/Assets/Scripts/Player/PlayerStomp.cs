using UnityEngine;

public class PlayerStomp : MonoBehaviour
{
    [SerializeField]
    private BoxCollider2D bc;
    [SerializeField]
    private Rigidbody2D rb;
    [SerializeField]
    private LayerMask listEnemiesLayers;
    private float checkDistance = 0.2f;
    [SerializeField]
    private const float minStompVelocity = -0.1f;
    [SerializeField]
    private FloatVariable bounceForce;
    [SerializeField]
    private PlayerMovement playerMovement;

    private RaycastHit2D hit;

    private void FixedUpdate()
    {
        hit = Physics2D.BoxCast(
            new Vector2(bc.bounds.center.x, bc.bounds.min.y - (checkDistance / 2)),
            new Vector2(bc.bounds.size.x * 0.8f, checkDistance),
            0,
            Vector2.down,
            0,
            listEnemiesLayers
        );

        if (hit.collider != null)
        {
            bool isAboveEnemy = hit.collider.transform.position.y < bc.bounds.min.y;

            IHurtable[] listHurtables = hit.collider.GetComponentsInParent<IHurtable>();

            if (listHurtables.Length > 0 && rb.linearVelocityY <= minStompVelocity && isAboveEnemy)
            {
                foreach (var component in listHurtables)
                {
                    component.Hurt();
                }

                playerMovement.ResetCoyoteTime();

                rb.linearVelocity = new Vector2(rb.linearVelocity.x, 0f);
                rb.AddForce(Vector2.up * bounceForce.CurrentValue, ForceMode2D.Impulse);
            }
        }
    }

    void OnDrawGizmos()
    {
        if (bc != null)
        {
            Gizmos.color = Color.blue;
            Gizmos.DrawWireCube(
                new Vector2(bc.bounds.center.x, bc.bounds.min.y - (checkDistance / 2)),
                new Vector2(bc.bounds.size.x * 0.8f, checkDistance)
            );
        }
    }
}
