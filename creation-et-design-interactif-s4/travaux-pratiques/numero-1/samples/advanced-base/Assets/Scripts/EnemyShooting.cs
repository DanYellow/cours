using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class EnemyShooting : MonoBehaviour
{
    public Animator animator;
    public GameObject projectile;
    public Transform firePoint;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            StartCoroutine(PlayAnimInterval(3));
        }
    }

    private IEnumerator PlayAnimInterval(int n)
    {
        while (n >= 0)
        {
            animator.Play("PlantAttack", -1, 0f);
            --n;
            yield return new WaitForSeconds(animator.GetCurrentAnimatorStateInfo(0).length);
            Debug.Log("n " + n);
        }
    }

    private void OnTriggerExit2D(Collider2D other)
    {
        // if (other.CompareTag("Player"))
        // {
        //     Debug.Log("OnTriggerExit2D" + animator.GetBool("Attack"));
        //     animator.SetBool("Attack", false);
        // }
    }

    public void Shoot()
    {
        GameObject bullet = Instantiate(projectile, firePoint.position, firePoint.rotation);
        // InvokeRepeating (nameof("SpawnObject"), 2);
    }
}
