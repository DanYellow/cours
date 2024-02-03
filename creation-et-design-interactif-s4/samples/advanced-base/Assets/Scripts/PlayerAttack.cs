using System.Linq;
using UnityEngine;

public class PlayerAttack : MonoBehaviour
{
    public BoxCollider2D bc;
    public Rigidbody2D rb;
    public LayerMask listEnemiesLayers;
    public float checkDistance = 0.2f;
    public PlayerMovement playerMovement;
    RaycastHit2D hit;

    Vector3 lastPosition;
    public Vector3 lastVel;

    private void Start()
    {


    }

    private void Update()
    {
        if (playerMovement.isGrounded)
        {
            lastPosition = transform.position;
        }
    }

    private void FixedUpdate()
    {
        hit = Physics2D.BoxCast(
            new Vector2(bc.bounds.center.x, bc.bounds.min.y - (checkDistance / 2)),
            new Vector2(bc.bounds.size.x * 0.8f, checkDistance),
            0,
            Vector2.down,
            0.2f,
            listEnemiesLayers
        );
        lastVel = rb.velocity;

        if (hit.collider != null)
        {
            bool isAboveEnemy = (
                hit.collider.transform.position.y < bc.bounds.min.y ||
                hit.collider.transform.position.y < lastPosition.y
            );

            Enemy enemy = hit.collider.GetComponent<Enemy>();
            if (enemy != null && isAboveEnemy && (rb.velocity.y <= 2.5f))
            {
                // enemy.GetComponent<IHurtable>().Hurt();

                // IHurtable[] saveables = FindObjectsOfType<MonoBehaviour>(true).OfType<IHurtable>().ToArray();

                IHurtable[] components = hit.collider.GetComponents(typeof(MonoBehaviour)).OfType<IHurtable>().ToArray();
                foreach (var component in components)
                {
                    component.Hurt();
                //     var method = component.GetType().GetMethod(
                //         "Hurt", 
                //         System.Reflection.BindingFlags.NonPublic  | System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance
                //     );
                //     print("method " + method);
                //     if (method != null)
                //     {
                //     print("method 330" + method);
                //         method.Invoke(hit.collider.gameObject, null);
                //     }
                }

                // enemy.TakeDamage();
                playerMovement.Jump();
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
