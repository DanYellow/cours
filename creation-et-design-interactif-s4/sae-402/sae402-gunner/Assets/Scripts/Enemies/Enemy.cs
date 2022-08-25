using UnityEngine;

public class Enemy : MonoBehaviour
{

    private void Awake()
    {
        gameObject.GetComponent<Health>().onDie += Die;
    }

    // InvokeRepeating("LaunchProjectile", 10.0f, 1f);

    public void Die()
    {
        Destroy(gameObject, 0.75f);
    }

    private void OnDestroy()
    {
        gameObject.GetComponent<Health>().onDie -= Die;
    }
}
