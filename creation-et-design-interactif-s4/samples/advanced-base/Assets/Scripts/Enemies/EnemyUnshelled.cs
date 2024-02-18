using UnityEngine;

public class EnemyUnshelled : MonoBehaviour
{
    public Animator animator;

    public GameObject unshelledPrefab;
    public GameObject shellPrefab;

    public void Hurt()
    {
        animator.SetTrigger("IsHit");
        Unshell();
    }

    private void Unshell()
    {
        Destroy(gameObject);
        GameObject unshelledEnemy = Instantiate(unshelledPrefab, transform.position, Quaternion.identity);
        unshelledEnemy.GetComponent<Enemy>().Hurt();

        GameObject shellEnemy = Instantiate(shellPrefab, transform.position, Quaternion.identity);
    }
}
