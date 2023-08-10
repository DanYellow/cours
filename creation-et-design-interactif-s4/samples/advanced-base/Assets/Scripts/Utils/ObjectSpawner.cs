using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Pool;

public class ObjectSpawner : MonoBehaviour
{
    public ObjectPool<GameObject> pool;
    public GameObject prefab;

    public int minItems = 3;
    public int maxItems = 7;

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
        }, false, minItems <= 0 ? 1 : minItems, maxItems);
    }
}
