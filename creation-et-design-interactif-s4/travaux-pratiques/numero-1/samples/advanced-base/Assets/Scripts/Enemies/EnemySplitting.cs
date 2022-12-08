
using UnityEngine;

public class EnemySplitting : MonoBehaviour
{
    public Rigidbody2D rb;
    public Animator animator;

    public GameObject split;

    public float bounce = 2f;

    public int nbOfSplit;

    private bool hasSplitted = false;

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.contacts[0].normal.y < -0.5f)
        {
            Vector2 bounceForce = Vector2.up * bounce;
            other.gameObject.GetComponent<Rigidbody2D>().AddForce(bounceForce, ForceMode2D.Impulse);

            animator.SetTrigger("IsHit");

            if (!hasSplitted && split != null)
            {
                hasSplitted = true;
                for (var i = 0; i < nbOfSplit; i++)
                {
                    Vector3 position = transform.position;
                    bool willFacingRight = i % 2 == 0;
                    Debug.Log("willFacingRight 1" + willFacingRight);
                    if(gameObject.TryGetComponent<EnemyPatrol>(out EnemyPatrol enemyPatrol)) {
                        if(enemyPatrol.isFacingRight) {
                            willFacingRight = !willFacingRight;
                        }
                    }
                    Debug.Log("willFacingRight 2" + willFacingRight);
                    

                    if(willFacingRight) {
                        position += Vector3.right * 2f; 
                    } else {
                        position -= Vector3.right * 2f; 
                    }

                    Quaternion angles = transform.rotation;
                    if(willFacingRight) {
                        angles = transform.rotation * Quaternion.Euler (0f, 180f, 0f);
                    }

                    GameObject child = Instantiate(
                        split, 
                        position, 
                        angles
                    );
        
                    child.GetComponent<EnemyPatrol>().isFacingRight = willFacingRight;
                }
            }

            rb.simulated = false;

            Destroy(gameObject, animator.GetCurrentAnimatorStateInfo(0).length + 0.03f);
        }
    }
}
