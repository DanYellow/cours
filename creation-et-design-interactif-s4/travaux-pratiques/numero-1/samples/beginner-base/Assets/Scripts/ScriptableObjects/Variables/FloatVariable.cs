using UnityEngine;

[CreateAssetMenu(fileName = "New Float Var", menuName = "ScriptableObjects/Variable/FloatVariable")]
public class FloatVariable : ScriptableObject
{
    public float CurrentValue;

    // public float DefaultValue;

    // private float currentValue;

    // public float CurrentValue
    // {
    //     get { return currentValue; }
    //     set { currentValue = value; }
    // }

    // private void OnEnable()
    // {
    //     currentValue = DefaultValue;
    // }
}