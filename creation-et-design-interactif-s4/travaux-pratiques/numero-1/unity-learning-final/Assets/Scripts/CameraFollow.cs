using UnityEngine;
using System.Collections;

public class CameraFollow : MonoBehaviour
{
    public GameObject player;
    public float delayBeforeFollowPlayer = 0;
    public Vector3 posOffset;
    private Vector3 _velocity;
    private Vector3 _nextPosition;

    void LateUpdate()
    {
        if(CameraShake.instance.IsShaking()) return;
        _nextPosition = player.transform.position + posOffset;

        transform.position = Vector3.SmoothDamp(
                transform.position,
                _nextPosition,
                ref _velocity,
                delayBeforeFollowPlayer
            );
    }
}
