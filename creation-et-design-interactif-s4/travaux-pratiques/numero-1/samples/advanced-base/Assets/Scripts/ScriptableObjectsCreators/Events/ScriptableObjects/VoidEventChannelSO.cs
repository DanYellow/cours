using UnityEngine;
using UnityEngine.Events;

[CreateAssetMenu(fileName ="New Void Event", menuName = "ScriptableObjects/Events/VoidEventChannelSO")]
public class VoidEventChannelSO : ScriptableObject
{
    public UnityAction OnEventRaised;

	public void Raise()
	{
		if (OnEventRaised != null)
			OnEventRaised.Invoke();
	}
}
