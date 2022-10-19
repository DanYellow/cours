using UnityEngine;
using UnityEngine.Events;

[System.Serializable]
public class IntEvent : UnityEvent<int>
{

}

public class IntEventListener : MonoBehaviour
{
    // Event to register
    public IntEventSO Event;

    // Function to call when the Event is invoked
    public IntEvent OnEventRaised;

    private void OnEnable()
	{
		if (Event != null)
			Event.OnEventRaised += Respond;
	}

	private void OnDisable()
	{
		if (Event != null)
			Event.OnEventRaised -= Respond;
	}

	private void Respond(int value)
	{
        Debug.Log("Event " + value);
		if (Event != null)
			OnEventRaised.Invoke(value);
	}
}