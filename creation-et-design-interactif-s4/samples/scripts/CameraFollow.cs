using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Transform target;
    private Vector3 velocity = Vector3.zero;
    public float smoothTime = 0.35f;
   
    private void LateUpdate() {
        if(target == null) {
            return;
        }

        Vector3 nextPosition = new Vector3(
            target.position.x,
            target.position.y,
            transform.position.z
        );

        // transform.position = nextPosition;
        transform.position = Vector3.SmoothDamp(
            transform.position,
            nextPosition,
            ref velocity,
            smoothTime
        );
    }
}
