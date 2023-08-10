using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Pool;

public class ObjectSpawner : MonoBehaviour
{
    public ObjectPool<Bullet> pool;
    public Bullet prefab;

    public int minItems = 3;
    public int maxItems = 7;

    // Start is called before the first frame update
    void Awake()
    {
        pool = new ObjectPool<Bullet>(() => {
            return Instantiate(prefab);
        }, (Bullet item) => {
            item.gameObject.SetActive(true);
            item.callback = Release;
            // item.OnContact(Release);
        }, item => {
            item.gameObject.SetActive(false);
        }, item => {
            Destroy(item.gameObject);
        }, false, minItems <= 0 ? 1 : minItems, maxItems);
    }

    private void Release(Bullet bullet) {
        print("release");
        pool.Release(bullet);
    }
}
