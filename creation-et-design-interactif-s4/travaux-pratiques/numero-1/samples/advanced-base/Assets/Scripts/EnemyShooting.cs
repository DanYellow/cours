using System.Collections;
using UnityEngine;

public class EnemyShooting : MonoBehaviour
{
    public Animator animator;
    public GameObject projectile;

    // From where the projectile will be shot
    public Transform firePoint;

    [Range(0, 5)]
    public float timeDelayBetweenShots = 0f;
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
            StopAllCoroutines();
        }
    }

    private IEnumerator PlayAnimInterval(int nbIterations)
    {
        while (nbIterations > 0)
        {
            animator.Play("PlantAttack", -1, 0f);
            --nbIterations;
            yield return new WaitForSeconds(animator.GetCurrentAnimatorStateInfo(0).length + timeDelayBetweenShots);
        }
    }

    public void Shoot()
    {
        Instantiate(projectile, firePoint.position, firePoint.rotation);
    }
}
