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

    public ObjectSpawner objectSpawner;

    public GameObject bulleto;

    public float delayBetweenShotsCycles;
    public int nbOfConsecutiveShots;

    private void Update() {
        if(Input.GetKeyDown(KeyCode.V)) {
            Shoot();
        }
    }

    // private void OnTriggerEnter2D(Collider2D other)
    // {
    //     if (other.CompareTag("Player"))
    //     {
    //         StartCoroutine(PlayAnimInterval(nbOfConsecutiveShots));
    //     }
    // }

    // private void OnTriggerExit2D(Collider2D other)
    // {
    //     if (other.CompareTag("Player"))
    //     {
    //         spriteRenderer.color = new Color(1, 1, 1, 1);
    //         StopAllCoroutines();
    //     }
    // }

    private IEnumerator PlayAnimInterval(int nbIterations)
    {
        spriteRenderer.color = Color.red;

        while (nbIterations > 0)
        {
            animator.SetTrigger("IsAttacking");
            nbIterations = nbIterations - 1;

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

        // GameObject bulletProjectile = Instantiate(bulleto);
        // bulletProjectile.transform.right = transform.right.normalized;
        // bulletProjectile.transform.SetPositionAndRotation(firePoint.position, firePoint.rotation);
        // print("fzfzez");

        if (bulletProjectile == null) {
            return;
        }
            // print(transform.right);
            // // bulletProjectile.transform.right = transform.right.normalized;
            bulletProjectile.transform.SetPositionAndRotation(firePoint.position, firePoint.rotation);
            bulletProjectile.GetComponent<Rigidbody2D>().velocity = 10 * transform.right;
            // bulletProjectile.GetComponent<Rigidbody2D>().AddForce(bulletProjectile.transform.right * 10, ForceMode2D.Force);
            // // print(firePoint.rotation);
            // // bulletProjectile.transform.right = transform.right.normalized;


            // // bullet.transform.position = _muzzleFlash.transform.position;
            // // bullet.transform.rotation = transform.rotation;

            // Bullet bullet = bulletProjectile.GetComponent<Bullet>();
            // // bullet.transform.right = transform.right;
            // bullet.invoker = transform;
            // // bullet.Initialize();
        
    }
}
