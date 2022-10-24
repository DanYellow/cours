using UnityEngine;
using UnityEngine.Events;

[System.Serializable]
public class BoolEvent : UnityEvent<bool>{}

public class BoolEventListener : MonoBehaviour
{
    // Event to register
    public BoolEventChannelSO Event;

    // Function to call when the Event is invoked
    public BoolEvent Callback;

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

	private void OnEventRaised(bool value)
	{
		if (Event != null)
			Callback.Invoke(value);
	}
}