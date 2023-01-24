using UnityEngine;
using System;

[CreateAssetMenu(fileName = "New Float Var Ref", menuName = "ScriptableObjects/Variable/SOFloatVariableRef")]
public class SOFloatVariableRef : ScriptableObject, ISerializationCallbackReceiver
{
    // https://answers.unity.com/questions/199691/nonserialized-vs-hideininspector-question.html
    // https://www.youtube.com/watch?v=oF6LEZQp4jk
    [NonSerialized]
    public float CurrentValue;

    [Multiline]
    public string DeveloperDescription = "";

    public float InitialValue;

    public void OnAfterDeserialize()
    {
        CurrentValue = InitialValue;
    }

    public void OnBeforeSerialize() { }
}