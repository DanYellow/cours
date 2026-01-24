using UnityEngine;
using UnityEngine.Events;

public abstract class EventChannel<T> : ScriptableObject
{
    public UnityAction<T> OnEventRaised;

    public void Raise(T value)
    {
        OnEventRaised?.Invoke(value);
    }
}