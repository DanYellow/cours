using UnityEngine;

public class PlayerSpawn : MonoBehaviour
{
    [Tooltip("Define where the player will spawn if there is an issue"), ReadOnlyInspector]
    public Vector3 currentSpawnPosition;

    [Tooltip("Define where the player started the level"), ReadOnlyInspector]
    public Vector3 initialSpawnPosition;

    public VectorVariable lastCheckpoint;

    private void Awake()
    {    
        if(lastCheckpoint.CurrentValue != null) {
            transform.position = (Vector3) lastCheckpoint.CurrentValue;
        } else {
            lastCheckpoint.CurrentValue = transform.position;
        }

        currentSpawnPosition = gameObject.transform.position;
        initialSpawnPosition = gameObject.transform.position;
    }
}
