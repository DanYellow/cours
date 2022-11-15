using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Transform target;
    public float delayBeforeFollowPlayer = .25f;
    public float smoothSpeed = 0.125f;
    public Vector3 posOffset;
    private Vector3 velocity = Vector3.zero;
    // private Vector3 nextPosition;

    void Start() {
        Vector3 nextPosition = target.position + posOffset;
        transform.position = target.position + posOffset;
    }

// Appelé après que le personnage a bougé (update)
    void LateUpdate()
    {
        // if(CameraShake.instance.IsShaking()) return;
        Vector3 nextPosition = target.position + posOffset;

        transform.position = Vector3.SmoothDamp(
                transform.position,
                target.position + posOffset,
                ref velocity,
                delayBeforeFollowPlayer
            );
    }
}
