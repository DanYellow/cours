using System.Collections;
using UnityEngine;

public class EnemyShooting : MonoBehaviour
{
    public Animator animator;

    [Tooltip("From where the projectile will be shot")]
    public Transform firePoint;
    public SpriteRenderer spriteRenderer;

    [Range(0, 5)]
    public float timeDelayBetweenShots;

    public ObjectPooling bulletPooling;

    public float delayBetweenShotsCycles;
    public int nbOfConsecutiveShots;

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

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            StartCoroutine(PlayAnimInterval(nbOfConsecutiveShots));
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            spriteRenderer.color = new Color(1, 1, 1, 1);
            StopAllCoroutines();
        }
    }

    private IEnumerator PlayAnimInterval(int nbIterations)
    {
        spriteRenderer.color = Color.red;

        while (nbIterations > 0)
        {
            animator.SetTrigger("IsAttacking");
            nbIterations--;

            yield return new WaitForSeconds(animator.GetCurrentAnimatorStateInfo(0).length + timeDelayBetweenShots);
        }

        spriteRenderer.color = Color.white;
        yield return new WaitForSeconds(delayBetweenShotsCycles);
        StartCoroutine(PlayAnimInterval(nbOfConsecutiveShots));
    }

    // Called from the animation's timeline
    public void Shoot()
    {
        ObjectPooled bulletProjectile = bulletPooling.Get("bullet");

        if (bulletProjectile == null)
        {
            return;
        }

        Bullet bullet = bulletProjectile.GetComponent<Bullet>();
        bulletProjectile.transform.SetPositionAndRotation(firePoint.position, Quaternion.identity);

        bullet.ResetThyself(facingDirection);
    }
}
