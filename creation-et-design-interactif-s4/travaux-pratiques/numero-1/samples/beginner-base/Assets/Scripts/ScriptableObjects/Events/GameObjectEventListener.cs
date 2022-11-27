using UnityEngine;
using UnityEngine.Events;


public class GameObjectEventListener : MonoBehaviour
{
    // Event to register
    public GameObjectEventChannelSO Event;

    // Function to call when the Event is invoked
    public UnityEvent<GameObject> Callback;

    private void OnEnable()
	{
		if (Event != null)
			Event.OnEventRaised += OnEventRaised;
	}

	private void OnDisable()
	{
		if (Event != null)
			Event.OnEventRaised -= OnEventRaised;
	}

	private void OnEventRaised(GameObject go)
	{
		if (Event != null)
			Callback.Invoke(go);
	}
}