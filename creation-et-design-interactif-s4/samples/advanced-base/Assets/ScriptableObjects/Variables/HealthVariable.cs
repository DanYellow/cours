using UnityEngine;

[CreateAssetMenu(fileName = "New Health Var", menuName = "ScriptableObjects/Variable/HealthVariable")]
public class HealthVariable : ScriptableObject
{
    public float maxValue;

    public float currentValue
    {
        get { return _currentValue; }
        set { _currentValue = Mathf.Clamp(value, 0, maxValue); }
    }

    [SerializeField]
    private float _currentValue;

    [Multiline]
    public string DeveloperDescription = "";
}