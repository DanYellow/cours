using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Pool;

public class ObjectSpawner : MonoBehaviour
{

    public ObjectPool<GameObject> pool;
    public GameObject prefab;
    // Start is called before the first frame update
    void Start()
    {
        pool = new ObjectPool<GameObject>(() => {
            return Instantiate(prefab);
        }, item => {
            item.SetActive(true);
        }, item => {
            item.SetActive(false);
        }, item => {
            Destroy(item);
        }, false, 3, 7);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
