using System.Collections;
using UnityEngine.Pool;
using UnityEngine;

public class ObjectPooled : MonoBehaviour
{
    // deactivate after delay
    [SerializeField] private float timeoutDelay = 3f;

    private IObjectPool<ObjectPooled> objectPool;

    // public property to give the projectile a reference to its ObjectPool
    public IObjectPool<ObjectPooled> ObjectPool { set => objectPool = value; }

    public void Deactivate()
    {
        StartCoroutine(DeactivateRoutine(timeoutDelay));
    }

    IEnumerator DeactivateRoutine(float delay)
    {
        yield return new WaitForSeconds(delay);

        // reset the moving Rigidbody
        Rigidbody rBody = GetComponent<Rigidbody>();
        rBody.velocity = new Vector3(0f, 0f, 0f);
        rBody.angularVelocity = new Vector3(0f, 0f, 0f);

        // release the projectile back to the pool
        objectPool.Release(this);
    }
}
