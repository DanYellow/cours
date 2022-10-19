using UnityEngine;
using UnityEngine.Events;

// Source : https://github.com/roboryantron/Unite2017/blob/master/Assets/Code/Events/GameEvent.cs
[CreateAssetMenu(fileName = "VoidEventSO", menuName = "ScriptableObjects/Events/VoidEventSO")]
public class VoidEventSO : ScriptableObject
{
    public UnityAction OnEventRaised;

	public void RaiseEvent()
	{
		if (OnEventRaised != null)
			OnEventRaised.Invoke();
	}
}
