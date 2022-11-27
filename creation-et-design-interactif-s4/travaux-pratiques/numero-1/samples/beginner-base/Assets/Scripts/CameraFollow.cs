using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Vector3 offset = new Vector3(0, 0f, -10f);
    private Vector3 velocity = Vector3.zero;

    public float smoothTime = 0.25f;

    public Transform target;

    private void LateUpdate()
    {
         Vector3 targetPosition = target.position + new Vector3(
            (offset.x * (target.localEulerAngles.y > 90 ? -1 : 1)),
            offset.y, 
            offset.z
        );
        transform.position = Vector3.SmoothDamp(transform.position, targetPosition, ref velocity, smoothTime);
    }
}