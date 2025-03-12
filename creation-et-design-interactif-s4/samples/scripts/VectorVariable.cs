using UnityEngine;

[CreateAssetMenu(fileName = "New Vector Var", menuName = "ScriptableObjects/Variable/VectorVariable")]
public class VectorVariable : ScriptableObject
{
    public Vector3? CurrentValue;

    [Multiline]
    public string DeveloperDescription = "";
}