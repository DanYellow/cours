using UnityEngine;
using UnityEngine.Events;

[CreateAssetMenu(fileName ="New Int Event", menuName = "ScriptableObjects/Events/IntEventChannelSO")]
public class IntEventChannelSO : ScriptableObject
{
    public event UnityAction<int> OnEventRaised;

	public void Raise(int value)
	{
		if (OnEventRaised != null)
			OnEventRaised.Invoke(value);
	}
}
