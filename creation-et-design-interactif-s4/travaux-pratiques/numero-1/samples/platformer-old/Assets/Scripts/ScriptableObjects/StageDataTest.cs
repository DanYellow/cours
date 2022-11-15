using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class StageDataTest : MonoBehaviour
{
    // Here you drag in the ScriptableObject instance via the Inspector in Unity
    [SerializeField] private Test example;

    private void Start()
    {
        // var scriptableObject = ScriptableObject.CreateInstance<Test>();

    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.J))
        {
            StoreData("hello", new List<int>()
                    {
                  14, 20, 10, 20, 54
                    });
        }
    }

    public void StoreData(string someString, List<int> someDatas)
    {
        example.someStringValue = someString;
        someDatas.ForEach((item) => {
            example.someCustomData.data.Add(item);
        });
        // example.someTransformReference = transform;
    }
}