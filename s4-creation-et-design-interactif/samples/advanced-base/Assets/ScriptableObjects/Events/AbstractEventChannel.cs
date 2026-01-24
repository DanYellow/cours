using UnityEngine;
using UnityEngine.Events;

public abstract class AbstractEventChannel : ScriptableObject
{
    public UnityAction OnEventRaised;

    public void Raise()
    {
        OnEventRaised?.Invoke();
    }

    [Multiline]
    public string DeveloperDescription = "";
}

public abstract class AbstractEventChannel<T> : ScriptableObject
{
    public UnityAction<T> OnEventRaised;

    public void Raise(T value)
    {
        OnEventRaised?.Invoke(value);
    }

    [Multiline]
    public string DeveloperDescription = "";
}

public abstract class AbstractEventChannel<T1, T2> : ScriptableObject
{
    public UnityAction<T1, T2> OnEventRaised;

    public void Raise(T1 value1, T2 value2)
    {
        OnEventRaised?.Invoke(value1, value2);
    }
}
