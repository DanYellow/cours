using System.Collections;
using UnityEngine.Pool;
using UnityEngine;

public class ObjectPooled : MonoBehaviour
{
    private IObjectPool<ObjectPooled> objectPool;

    // public property to give the projectile a reference to its ObjectPool
    public IObjectPool<ObjectPooled> ObjectPool { set => objectPool = value; }

    public void Release()
    {
        objectPool.Release(this);
    }
}
