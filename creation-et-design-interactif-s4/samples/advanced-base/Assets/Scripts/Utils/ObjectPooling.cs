using UnityEngine;
using System.Collections.Generic;

// More info : https://www.youtube.com/watch?v=YCHJwnmUGDk
// https://gameprogrammingpatterns.com/object-pool.html
public class ObjectPooling : MonoBehaviour
{
    [SerializeField]
    private GameObject prefab;

    [SerializeField]
    private int poolSize = 5;
    private Queue<GameObject> queueObjectsPooled = new Queue<GameObject>();

    public Transform container;

    public void Initialize(GameObject _objectToPool, int _poolSize)
    {
        prefab = _objectToPool;
        poolSize = _poolSize;
    }

    public GameObject CreateObject()
    {
        GameObject poolObject = null;

        if (queueObjectsPooled.Count < poolSize)
        {
            poolObject = Instantiate(prefab, transform.position, Quaternion.identity);
            poolObject.name = $"{transform.root.name}_{objectToPool.name}_{queueObjectsPooled.Count}";
            // poolObject.SetActive(false);
        } else {
            poolObject = queueObjectsPooled.Dequeue();
            poolObject.transform.position = transform.position;
            poolObject.transform.rotation = Quaternion.identity;
            poolObject.SetActive(true);
        }

        queueObjectsPooled.Enqueue(poolObject);

        return poolObject;
    }

    // private void CreateContainerIfNeeded()
    // {
    //     if (container != null)
    //     {
    //         string containerName = $"ContainerPool_{objectToPool.name}";
    //         GameObject containerGO = GameObject.Find(containerName);
    //         if (containerGO != null) {
    //             container = containerGO.transform;
    //         } else {
                
    //         }
    //     }
    // }
}