using UnityEngine;
using System.Collections.Generic;


public class ObjectPooling : MonoBehaviour {
    
    public static ObjectPooling instance;

    private List<GameObject> _listPooledObjects = new List<GameObject>();
    private int _amountToPool = 30;

    [SerializeField]
    private GameObject prefab;

    private void Awake() {
        if(instance == null) {
            instance = this;
        }
    }

    void Start() {
        for (int i = 0; i < _amountToPool; i++)
        {
            GameObject obj = Instantiate(prefab);
            obj.SetActive(false);
            _listPooledObjects.Add(obj);
        }
    }

    public GameObject GetPooledObject(){
        for (int i = 0; i < _listPooledObjects.Count; i++)
        {
            if(!_listPooledObjects[i].activeInHierarchy) {
                return _listPooledObjects[i];
            }
        }

        return null;
    }
}