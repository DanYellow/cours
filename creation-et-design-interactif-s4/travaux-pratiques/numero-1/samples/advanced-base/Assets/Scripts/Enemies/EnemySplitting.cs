
using UnityEngine;

public class EnemySplitting : MonoBehaviour
{
    public Animator animator;

    [Tooltip("Gameobject to instantiate when the enemy is hit")]
    public GameObject split;

    [Tooltip("Number of items created after being hit")]
    public int nbOfSplit;

    private bool hasSplitted = false;

    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.contacts[0].normal.y < -0.5f)
        {
            animator.SetTrigger("IsHit");

            Quaternion angles = transform.rotation;

            if (!hasSplitted && split != null)
            {
                hasSplitted = true;
                for (var i = 0; i < nbOfSplit; i++)
                {
                    Vector3 position = transform.position;
                    bool willFacingRight = i % 2 != 0;

                    if (TryGetComponent<EnemyPatrol>(out EnemyPatrol enemyPatrol))
                    {
                        if (enemyPatrol.isFacingRight)
                        {
                            angles = Quaternion.Euler(0f, 0f, 0f);
                        }
                    }

                    if (willFacingRight)
                    {
                        angles = Quaternion.Euler(0f, -180f, 0f);
                    }

                    GameObject child = Instantiate(split, position, angles);

                    child.GetComponent<EnemyPatrol>().isFacingRight = willFacingRight;
                }
            }
        }
    }
}
