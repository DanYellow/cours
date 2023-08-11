using UnityEngine;
using System.Collections.Generic;
using UnityEngine.Pool;

[System.Serializable]
public class ObjectPoolItem
{
    [SerializeField, Tooltip("Sets the limit of objects created in memory (expandable dynamically)")]
    public string key = "";
    public int minItems = 3;
    public int maxItems = 7;

    [Tooltip("Defines the prefab to instanciate / pool")]
    public IObjectPool<ObjectPooled> pool;
    public GameObject prefab;

    [HideInInspector]
    public int count = 0;
}

// More info : 
// https://www.youtube.com/watch?v=7EZ2F-TzHYw
// https://docs.unity3d.com/ScriptReference/Pool.ObjectPool_1-ctor.html
// https://unity.com/how-to/use-object-pooling-boost-performance-c-scripts-unity
// https://thegamedev.guru/unity-cpu-performance/object-pooling/#1-constructing-your-pool
public class ObjectPooling : MonoBehaviour
{
    public List<ObjectPoolItem> listItemsToPool = new List<ObjectPoolItem>();

    public Dictionary<string, ObjectPoolItem> listDictItemsToPool = new Dictionary<string, ObjectPoolItem>();
    public VoidEventChannelSO onGet;
    
    private void Awake()
    {
        foreach (ObjectPoolItem obj in listItemsToPool)
        {
            string key = (obj.key != "") ? obj.key : obj.prefab.name;

            obj.pool = new ObjectPool<ObjectPooled>(
                () => {
                    return CreateFunc(obj);
                },
                ActionOnGet,
                ActionOnRelease,
                ActionOnDestroy,
                true, 
                obj.minItems <= 0 ? 1 : obj.minItems, 
                obj.maxItems
            );

            listDictItemsToPool.Add(key, obj);
        }
    }

    ObjectPooled CreateFunc(ObjectPoolItem obj)
    {
        GameObject item = Instantiate(obj.prefab);
        obj.count++;
        item.name = $"{transform.name}_{obj.prefab.name}_{obj.count}";

        ObjectPooled pooled = item.GetComponent<ObjectPooled>();
        pooled.Pool = obj.pool;

        return pooled;
    }

    void ActionOnGet(ObjectPooled item)
    {
        onGet.Raise();
        item.gameObject.SetActive(true);
    }

    void ActionOnRelease(ObjectPooled item)
    {
        item.gameObject.SetActive(false);
    }

    void ActionOnDestroy(ObjectPooled item)
    {
        Destroy(item.gameObject);
    }

    public ObjectPooled Get(string key = "")
    {
        ObjectPooled poolObject = null;
        if (listDictItemsToPool.TryGetValue(key, out ObjectPoolItem itemToPool))
        {
            poolObject = itemToPool.pool.Get();
        }

        return poolObject;
    }

    private void OnDestroy()
    {
        if (gameObject.scene.isLoaded)
        {
            foreach (ObjectPoolItem itemToPool in listItemsToPool)
            {
                itemToPool.pool.Clear();
            }
        }
    }
}

// It's worth noting - if your components have state, 
// you need to handle re-initializing that state in the pool's ActionOnGet.

// In my own Object Pool implementation I handled this by having something 
// like an "IPoolable" interface that components can implement to handle 
// the Get/Release lifecycle events from pooling, 
// and iterating over those components.

interface IPoolable
{
    void Get();
    // void Release();
}