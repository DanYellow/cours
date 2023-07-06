using UnityEngine;
using System.Linq;
using System.Collections.Generic;

[System.Serializable]
public class ObjectPoolItem
{
    [SerializeField, Tooltip("Sets the limit of objects created in memory (expandable dynamically)")]
    public int poolSize = 5;
    public string key = "";

    [Tooltip("Defines the prefab to instanciate / pool")]
    public GameObject prefab;
    public Queue<GameObject> queueObjectsPooled = new Queue<GameObject>();
}

// More info : 
// https://www.youtube.com/watch?v=YCHJwnmUGDk
// https://gameprogrammingpatterns.com/object-pool.html
public class ObjectPooling : MonoBehaviour
{
    public List<ObjectPoolItem> listItemsToPool = new List<ObjectPoolItem>();

    public Dictionary<string, ObjectPoolItem> listDictItemsToPool = new Dictionary<string, ObjectPoolItem>();

    private void Start()
    {
        foreach (ObjectPoolItem obj in listItemsToPool)
        {
            string key = (obj.key != "") ? obj.key : obj.prefab.name;
            listDictItemsToPool.Add(key, obj);
        }
    }

    public GameObject CreateObject(string key = "")
    {
        GameObject poolObject = null;

        if (listDictItemsToPool.TryGetValue(key, out ObjectPoolItem itemToPool))
        {
            Queue<GameObject> queueObjectsPooled = itemToPool.queueObjectsPooled;

            bool allObjectsActive = queueObjectsPooled.ToList().All(obj => obj.activeSelf);

            if (queueObjectsPooled.Count < itemToPool.poolSize || allObjectsActive)
            {
                poolObject = Instantiate(itemToPool.prefab, transform.position, Quaternion.identity);
                poolObject.name = $"{transform.name}_{itemToPool.prefab.name}_{queueObjectsPooled.Count}";
            }
            else
            {
                poolObject = queueObjectsPooled.Dequeue();
                poolObject.transform.position = transform.position;
                poolObject.transform.rotation = Quaternion.identity;

                poolObject.SetActive(true);
            }

            queueObjectsPooled.Enqueue(poolObject);
        }

        return poolObject;
    }

    private void OnDestroy()
    {
        foreach (ObjectPoolItem itemToPool in listItemsToPool)
        {
            Queue<GameObject> queueObjectsPooled = itemToPool.queueObjectsPooled;

            foreach (GameObject obj in queueObjectsPooled.ToList().Where(poolObj => !poolObj.activeSelf))
            {
                if (obj != null)
                {
                    Destroy(obj);
                }
            }
        }
    }
}
