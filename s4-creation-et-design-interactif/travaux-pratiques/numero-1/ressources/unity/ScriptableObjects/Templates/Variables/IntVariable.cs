using UnityEngine;

[CreateAssetMenu(fileName = "IntVariable", menuName = "Scriptable Objects/Variables/Int")]
public class IntVariable : ScriptableObject
{
    public int CurrentValue;

    [Multiline]
    public string DeveloperDescription = "";
}
