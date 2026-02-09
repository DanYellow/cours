using UnityEngine;

public class Shell : MonoBehaviour
{
    public BoxCollider2D bc;
    public Rigidbody2D rb;
    public Animator animator;

    public float speed = 0.3f;

    private bool isVisible;

    public ParticleSystem particleEmitter;

    [Header("Layers")]
    public LayerMask obstacleLayers;

    private RaycastHit2D hit;

    [SerializeField]
    private bool isSpriteFacingRight = true;

    // https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/statements-expressions-operators/expression-bodied-members
    private float facingDirection
    {
        get
        {
            return Mathf.Sign(transform.localScale.x) * (isSpriteFacingRight ? 1 : -1);
        }
    }

    private void Start()
    {
        particleEmitter.Stop();
    }

    private void FixedUpdate()
    {
        Vector3 startCast = new Vector2(bc.bounds.center.x + (facingDirection * (bc.bounds.size.x / 2)), bc.bounds.center.y);
        hit = Physics2D.Linecast(
            startCast,
            new Vector2(startCast.x + (facingDirection * 0.1f), startCast.y),
            obstacleLayers
        );

        if (hit.collider != null)
        {
            Flip();
        }

        rb.AddForce(new Vector2(speed * facingDirection, rb.linearVelocity.y) * rb.mass, ForceMode2D.Impulse);
    }

    private void Flip()
    {
        if (isVisible)
        {
            particleEmitter.Play();
        }
        animator.SetTrigger("IsHit");

        Vector3 localScale = transform.localScale;
        localScale.x *= -1f;
        transform.localScale = localScale;
    }

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            other.gameObject.GetComponent<Knockback>().Apply(Vector2.zero, 0);
        }
    }

    void OnTriggerEnter2D(Collider2D collision)
    {
        int enemiesLayer = LayerMask.NameToLayer("Enemies");

        if (enemiesLayer == collision.gameObject.layer)
        {
            IHurtable[] listHurtables = collision.GetComponentsInParent<IHurtable>();
            foreach (var component in listHurtables)
            {
                component.Hurt();
            }
        }
    }

    void OnDrawGizmos()
    {
        Gizmos.color = Color.magenta;
        Vector2 startCast = new Vector2(bc.bounds.center.x + (facingDirection * (bc.bounds.size.x / 2)), bc.bounds.center.y);

        Gizmos.DrawLine(
            startCast,
            new Vector2(startCast.x + (facingDirection * 0.1f), startCast.y)
        );
    }

    private void OnBecameVisible()
    {
        isVisible = true;
    }

    private void OnBecameInvisible()
    {
        isVisible = false;
    }
}
