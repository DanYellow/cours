using UnityEngine;

[CreateAssetMenu(fileName = "New Health Var", menuName = "ScriptableObjects/Variable/HealthVariable")]
public class HealthVariable : ScriptableObject
{
    public int maxValue;

    public int currentValue
    {
        get { return _currentValue; }
        set { _currentValue = Mathf.Clamp(value, 0, maxValue); }
    }

    private int _currentValue;

    [Multiline]
    public string DeveloperDescription = "";
}