using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Vector2 offset = new Vector2(0, 0f);
    private Vector3 velocity = Vector3.zero;

    public float smoothTime = 0.25f;

    [SerializeField] 
    private Transform target;

    private Vector3 nextPosition;

    void Start() {
        nextPosition = target.position + new Vector3(
            (offset.x * (target.localEulerAngles.y > 90 ? -1 : 1)),
            offset.y, 
            transform.position.z
        );

        transform.position = nextPosition;
    }

    void LateUpdate()
    {
        nextPosition = target.position + new Vector3(
            (offset.x * (target.localEulerAngles.y > 90 ? -1 : 1)),
            offset.y, 
            transform.position.z
        );
        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, smoothTime);
    }
}