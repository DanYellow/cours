using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerSpawn : MonoBehaviour
{
    public Vector3Variable currentCheckpoint;
    private void Awake() {
        if(currentCheckpoint?.CurrentValue != null) {
            transform.position = currentCheckpoint.CurrentValue;
        }
    }
}
