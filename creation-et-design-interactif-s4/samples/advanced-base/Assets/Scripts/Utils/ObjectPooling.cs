using UnityEngine;
using System.Collections.Generic;

// More info : https://www.youtube.com/watch?v=YCHJwnmUGDk
// https://gameprogrammingpatterns.com/object-pool.html
public class ObjectPooling : MonoBehaviour {
    
    public static ObjectPooling instance;

    private List<GameObject> listPooledObjects = new List<GameObject>();
    
    [SerializeField]
    private int amountToPool = 5;

    [SerializeField]
    private GameObject prefab;

    private void Awake() {
        if(instance == null) {
            instance = this;
        }
    }

    void Start() {
        for (int i = 0; i < amountToPool; i++)
        {
            GameObject obj = Instantiate(prefab);
            obj.SetActive(false);
            listPooledObjects.Add(obj);
        }
    }

    public GameObject GetPooledObject(){
        for (int i = 0; i < listPooledObjects.Count; i++)
        {
            if(!listPooledObjects[i].activeInHierarchy) {
                return listPooledObjects[i];
            }
        }

        return null;
    }
}