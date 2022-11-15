using UnityEngine;

public class StageDataRead : MonoBehaviour
{
     [SerializeField] private Test example;

     private void Start() {
        // ExampleLog();
     }

    public void ExampleLog()
    {
        Debug.Log($"string: {example.someStringValue}", this);
        Debug.Log($"data: There are {example.someCustomData.data.Count} entries in data.", this);
        // example.someCustomData.data.ForEach((item) => Debug.Log(item));
    }
}