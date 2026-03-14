using UnityEngine;
using UnityEngine.Events;

public abstract class EventChannel : ScriptableObject
{
    public UnityAction OnEventRaised;

    public void Raise()
    {
        OnEventRaised?.Invoke();
    }
}

public abstract class EventChannel<T> : ScriptableObject
{
    public UnityAction<T> OnEventRaised;

    public void Raise(T value)
    {
        OnEventRaised?.Invoke(value);
    }
}
