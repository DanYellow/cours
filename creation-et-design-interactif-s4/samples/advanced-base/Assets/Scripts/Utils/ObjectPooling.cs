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
    public ObjectPool<GameObject> pool;
    public GameObject prefab;
}

// More info : 
// https://www.youtube.com/watch?v=7EZ2F-TzHYw
// https://docs.unity3d.com/ScriptReference/Pool.ObjectPool_1-ctor.html
// https://thegamedev.guru/unity-cpu-performance/object-pooling/#1-constructing-your-pool
public class ObjectPooling : MonoBehaviour
{
    public List<ObjectPoolItem> listItemsToPool = new List<ObjectPoolItem>();

    public Dictionary<string, ObjectPoolItem> listDictItemsToPool = new Dictionary<string, ObjectPoolItem>();

    private void Start()
    {
        foreach (ObjectPoolItem obj in listItemsToPool)
        {
            string key = (obj.key != "") ? obj.key : obj.prefab.name;

            obj.pool = new ObjectPool<GameObject>(() =>
            {
                return Instantiate(obj.prefab);
            }, item =>
            {
                item.SetActive(true);
            }, item =>
            {
                item.SetActive(false);
            }, item =>
            {
                Destroy(item);
            }, true, obj.minItems <= 0 ? 1 : obj.minItems, obj.maxItems);

            listDictItemsToPool.Add(key, obj);
        }
    }

    public GameObject Get(string key = "")
    {
        GameObject poolObject = null;
        if (listDictItemsToPool.TryGetValue(key, out ObjectPoolItem itemToPool))
        {
            poolObject = itemToPool.pool.Get();
            poolObject.name = $"{transform.name}_{itemToPool.prefab.name}";
        }

        return poolObject;
    }

    public void Release(string key = "", GameObject go = null)
    {
        if (listDictItemsToPool.TryGetValue(key, out ObjectPoolItem itemToPool))
        {
            itemToPool.pool.Release(go);
        }
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
