using UnityEngine.Events;
using UnityEngine;

public class RockHeadTrigger : MonoBehaviour
{
    [HideInInspector]
    public GameObject sibling = null;

    // Allow to call external methods when an action occurs within this script
    public UnityEvent onTrigger;

    private void OnTriggerEnter2D(Collider2D other) {
        if(other.gameObject == sibling) {
            onTrigger?.Invoke();
            gameObject.SetActive(false);
        }
    }
}
