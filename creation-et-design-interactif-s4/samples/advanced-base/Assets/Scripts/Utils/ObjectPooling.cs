using UnityEngine;
using System.Linq;
using System.Collections.Generic;

// More info : https://www.youtube.com/watch?v=YCHJwnmUGDk
// https://gameprogrammingpatterns.com/object-pool.html
public class ObjectPooling : MonoBehaviour
{
    private GameObject prefab;

    [SerializeField, Tooltip("Sets the limit of objects created in memory (expandable dynamically)")]
    private int poolSize = 5;
    private Queue<GameObject> queueObjectsPooled = new Queue<GameObject>();

    public void Initialize(GameObject _objectToPool) => prefab = _objectToPool;

    public GameObject CreateObject()
    {
        GameObject poolObject = null;

        bool allObjectsActive = queueObjectsPooled.ToList().All(obj => obj.activeSelf);

        if (queueObjectsPooled.Count < poolSize || allObjectsActive)
        {
            poolObject = Instantiate(prefab, transform.position, Quaternion.identity);
            poolObject.name = $"{transform.name}_{prefab.name}_{queueObjectsPooled.Count}";
        }
        else
        {
            poolObject = queueObjectsPooled.Dequeue();
            poolObject.transform.position = transform.position;
            poolObject.transform.rotation = Quaternion.identity;

            poolObject.SetActive(true);
        }

        queueObjectsPooled.Enqueue(poolObject);

        return poolObject;
    }

    private void OnDestroy()
    {
        foreach (GameObject obj in queueObjectsPooled.ToList().Where(obj => !obj.activeSelf))
        {
            Destroy(obj);
        }
    }
}