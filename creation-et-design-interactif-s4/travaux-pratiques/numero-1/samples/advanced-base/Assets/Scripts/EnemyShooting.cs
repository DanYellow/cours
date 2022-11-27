using System.Collections;
using UnityEngine;

public class EnemyShooting : MonoBehaviour
{
    public Animator animator;
    public GameObject projectile;

    // From where the projectile will be shot
    public Transform firePoint;
    public SpriteRenderer spriteRenderer;

    [Range(0, 5)]
    public float timeDelayBetweenShots = 0f;

    [Tooltip("Warning time before first shot")]
    public float delayBeforeFirstShot = 0.5f;
    public int nbOfConsecutiveShots = 3;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            StopAllCoroutines();
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
        yield return new WaitForSeconds(delayBeforeFirstShot);
        spriteRenderer.color = new Color(1, 1, 1, 1);

        while (nbIterations > 0)
        {
            animator.Play("PlantAttack");
            nbIterations = nbIterations - 1;

            yield return new WaitForSeconds(animator.GetCurrentAnimatorStateInfo(0).length + timeDelayBetweenShots);
        }
    }

    public void Shoot()
    {
        Instantiate(projectile, firePoint.position, firePoint.rotation);
    }
}
