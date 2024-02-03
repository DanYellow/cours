using UnityEngine;

public class EnemyDamageManager : MonoBehaviour
{
    public Enemy enemy;
    public EnemySplitting enemySplitting;

    public void Hurt()
    {
        if (enemy != null)
        {
            enemy.Hurt();
        }

        if (enemySplitting)
        {
            enemySplitting.Hurt();
        }
    }
}
