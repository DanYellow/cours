using UnityEngine.Events;
using UnityEngine;

public class RockHeadTrigger : MonoBehaviour
{
    [HideInInspector]
    public GameObject rockHead = null;

    // Allow to call external methods when an action occurs within this script
    public UnityEvent onTrigger;

    private void OnTriggerEnter2D(Collider2D other) {
        if(other.gameObject == rockHead) {
            onTrigger?.Invoke();
            gameObject.SetActive(false);
        }
    }
}
