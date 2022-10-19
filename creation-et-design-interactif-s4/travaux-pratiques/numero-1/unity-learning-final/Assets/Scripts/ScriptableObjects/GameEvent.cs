using UnityEngine;
using System.Collections.Generic;

// Source : https://github.com/roboryantron/Unite2017/blob/master/Assets/Code/Events/GameEvent.cs
[CreateAssetMenu(fileName = "GameEventData", menuName = "ScriptableObjects/GameEvents"), System.Serializable]
public class GameEvent : ScriptableObject
{
    /// <summary>
    /// The list of listeners that this event will notify if it is raised.
    /// </summary>
    private readonly List<GameEventListener> listEventListeners =
       new List<GameEventListener>();

    public void Raise()
    {
        for (int i = listEventListeners.Count - 1; i >= 0; i--)
            listEventListeners[i].OnEventRaised();
    }

    public void RegisterListener(GameEventListener listener)
    {
        if (!listEventListeners.Contains(listener))
            listEventListeners.Add(listener);
    }

    public void UnregisterListener(GameEventListener listener)
    {
        if (listEventListeners.Contains(listener))
            listEventListeners.Remove(listener);
    }
}
