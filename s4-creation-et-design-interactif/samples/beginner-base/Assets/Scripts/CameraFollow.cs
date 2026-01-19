using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Vector3 offset = Vector3.zero;
    private Vector3 velocity = Vector3.zero;

    public float smoothTime = 0.25f;

    public Transform target;
    private Vector3 nextPosition;

    void Start() {
        nextPosition = target.position + new Vector3(
            offset.x * target.localEulerAngles.y > 90 ? -1 : 1,
            offset.y,
            transform.position.z
        );

        transform.position = nextPosition;
    }

    private void LateUpdate()
    {
        nextPosition = target.position + new Vector3(
            offset.x * (target.localEulerAngles.y > 90 ? -1 : 1),
            offset.y,
            transform.position.z
        );
        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, smoothTime);
    }

    // void OnDrawGizmos()
    // {
    //     if (!target) return;

    //     float direction = target.localEulerAngles.y > 90 ? -1 : 1;

    //     Vector3 previewPosition = target.position + new Vector3(
    //         offset.x * direction,
    //         offset.y,
    //         transform.position.z
    //     );

    //     // Draw offset line
    //     Gizmos.color = Color.yellow;
    //     Gizmos.DrawLine(target.position, previewPosition);
    // }
}
