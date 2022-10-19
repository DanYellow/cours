using UnityEngine;
using UnityEngine.Events;

// Source : https://github.com/roboryantron/Unite2017/blob/master/Assets/Code/Events/GameEvent.cs
[CreateAssetMenu(menuName = "ScriptableObjects/Events/IntEventSO")]
public class IntEventSO : ScriptableObject
{
    public UnityAction<int> OnEventRaised;

	public void RaiseEvent(int value)
	{
		if (OnEventRaised != null)
			OnEventRaised.Invoke(value);
	}
}
