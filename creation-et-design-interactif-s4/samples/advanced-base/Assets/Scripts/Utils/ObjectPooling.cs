using UnityEngine;
using System.Linq;
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
            }, false, obj.minItems <= 0 ? 1 : obj.minItems, obj.maxItems);
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

    // public GameObject CreateObject(string key = "")
    // {
    //     GameObject poolObject = null;

    //     if (listDictItemsToPool.TryGetValue(key, out ObjectPoolItem itemToPool))
    //     {
    //         Queue<GameObject> queueObjectsPooled = itemToPool.queueObjectsPooled;

    //         bool allObjectsActive = queueObjectsPooled.ToList().All(obj => obj.activeSelf);

    //         if (queueObjectsPooled.Count < itemToPool.poolSize || allObjectsActive)
    //         {
    //             poolObject = Instantiate(itemToPool.prefab, transform.position, Quaternion.identity);
    //             poolObject.name = $"{transform.name}_{itemToPool.prefab.name}_{queueObjectsPooled.Count}";
    //         }
    //         else
    //         {
    //             poolObject = queueObjectsPooled.Dequeue();
    //             poolObject.SetActive(true);
    //         }

    //         queueObjectsPooled.Enqueue(poolObject);
    //     }

    //     return poolObject;
    // }

    // private void OnDestroy()
    // {
    //     foreach (ObjectPoolItem itemToPool in listItemsToPool)
    //     {
    //         Queue<GameObject> queueObjectsPooled = itemToPool.queueObjectsPooled;

    //         foreach (GameObject obj in queueObjectsPooled.ToList().Where(poolObj => poolObj != null || !poolObj.activeSelf))
    //         {
    //             if (obj != null)
    //             {
    //                 Destroy(obj);
    //             }
    //         }
    //     }
    // }
}
