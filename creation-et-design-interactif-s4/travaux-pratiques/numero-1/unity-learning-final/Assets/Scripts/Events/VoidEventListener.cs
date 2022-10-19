using UnityEngine;
using UnityEngine.Events;

// https://github.com/UnityTechnologies/open-project-1/blob/devlogs/2-scriptable-objects/UOP1_Project/Assets/Scripts/Events/IntEventListener.cs
// https://www.youtube.com/watch?v=WLDgtRNK2VE
public class VoidEventListener : MonoBehaviour
{
    // Event to register
    public VoidEventSO Event;

    // Function to call when the Event is invoked
    public UnityEvent Callback;

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

	private void OnEventRaised()
	{
		if (Event != null)
			Callback.Invoke();
	}
}