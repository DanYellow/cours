using UnityEngine;
using System.Collections;
using System.Collections.Generic;

[CreateAssetMenu(fileName = "Data", menuName = "Examples/ExampleScriptableObject")]
public class Test : ScriptableObject
{
    [TextArea()]
    public string someStringValue = "";
    // public CustomDataClass someCustomData = null;
    public Transform someTransformReference = null;
    public CustomDataClass someCustomData = null;

    // private void OnApplicationQuit() {
    //     Debug.Log("test");
    // }

    // Could also implement some methods to set/read data,
    // do stuff with the data like parsing between types, fileIO etc

    // Especially ScriptableObjects also implement OnEnable and Awake
    // so you could still fill them with permanent data via FileIO at the beginning of your app and store the data via FileIO in OnDestroy !!
}

// If you want the data to be stored permanently in the editor
// and e.g. set it via the Inspector
// your types need to be Serializable!
//
// I intentionally used a non-serializable class here to show that also 
// non Serializable types can be passed between scenes 

[System.Serializable]
public class CustomDataClass
{
    public List<int> data;
}