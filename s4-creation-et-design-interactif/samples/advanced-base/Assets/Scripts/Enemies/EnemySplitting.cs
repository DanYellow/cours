using UnityEngine;

public class EnemySplitting : MonoBehaviour, IHurtable
{
    public Animator animator;

    [Tooltip("Gameobject to instantiate when the enemy is hit")]
    public GameObject splitPrefab;

    [Tooltip("Number of items created after being hit")]
    public int nbOfSplits;

    private bool hasSplitted = false;

    public void Hurt()
    {
        animator.SetTrigger("IsHit");
        Split();
    }

    private void Split()
    {
        Vector3 position = transform.position;
        float posXDelta = 1.5f;
        if (!hasSplitted && splitPrefab != null)
        {
            hasSplitted = true;
            for (int i = 0; i < nbOfSplits; i++)
            {
                bool willFacingRight = i % 2 != 0;

                Vector3 randomPosition = new Vector3(
                    Random.Range(position.x - posXDelta, position.x + posXDelta),
                    position.y,
                    position.z
                );

                GameObject go = Instantiate(splitPrefab, randomPosition, Quaternion.Euler(0f, 0f, 0f));
                Vector3 localScale = go.transform.localScale;
                localScale.x *= willFacingRight ? -1f : 1f;
                go.transform.localScale = localScale;
            }
        }
    }
}
