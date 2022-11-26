using UnityEngine;
using UnityEngine.Events;

[CreateAssetMenu(fileName ="New GameObject Event", menuName = "ScriptableObjects/Events/GameObjectEventChannelSO")]
public class GameObjectEventChannelSO : ScriptableObject
{
    public UnityAction<GameObject> OnEventRaised;

	public void Raise(GameObject go)
	{
		if (OnEventRaised != null)
			OnEventRaised.Invoke(go);
	}
}
