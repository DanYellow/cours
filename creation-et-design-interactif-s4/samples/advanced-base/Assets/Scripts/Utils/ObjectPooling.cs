using UnityEngine;
using System.Collections.Generic;

// More info : https://www.youtube.com/watch?v=YCHJwnmUGDk
// https://gameprogrammingpatterns.com/object-pool.html
public class ObjectPooling : MonoBehaviour
{

    [SerializeField]
    private GameObject objectToPool;

    [SerializeField]
    private int poolSize = 5;
    private Queue<GameObject> listObjectPooled = new Queue<GameObject>();

    public Transform container;

    public void Initialize(GameObject _objectToPool, int _poolSize)
    {
        objectToPool = _objectToPool;
        poolSize = _poolSize;
    }

    private void CreateContainerIfNeeded()
    {
        if (container != null)
        {
            string containerName = $"ContainerPool_{objectToP}"
        }
    }
}