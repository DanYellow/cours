using System.Collections;
using UnityEngine;

public class EnemyShooting : MonoBehaviour
{
    public Animator animator;
    public GameObject projectile;

    // D'où on va tirer notre projectile
    public Transform firePoint;

    [Range(0, 5)]
    public float timeDelayBetweenShots = 0;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            
            StopAllCoroutines();
            StartCoroutine(PlayAnimInterval(3));
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
        while (nbIterations >= 0)
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
