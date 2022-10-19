using UnityEngine;
using UnityEngine.Events;

// https://github.com/UnityTechnologies/open-project-1/blob/devlogs/2-scriptable-objects/UOP1_Project/Assets/Scripts/Events/IntEventListener.cs

public class VoidEventListener : MonoBehaviour
{
    // Event to register
    public VoidEventSO Event;

    // Function to call when the Event is invoked
    public UnityEvent Response;

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

	private void Respond()
	{
		if (Event != null)
			Response.Invoke();
	}
}