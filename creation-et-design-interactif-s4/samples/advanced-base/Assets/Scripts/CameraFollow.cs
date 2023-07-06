using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Vector3 offset = Vector3.zero;
    private Vector3 velocity = Vector3.zero;

    public float smoothTime = 0.25f;

    [SerializeField]
    private Transform target;

    private Vector3 nextPosition;

    [SerializeField]
    private Vector2 deadZone;

    private float yDifference;
    public float yThreshold = 1;
 // https://www.youtube.com/watch?v=Jn0lYl9j3Hc

    void Start()
    {
        nextPosition = GetNextPosition();
        transform.position = nextPosition;
    }

    void LateUpdate()
    {
        if (!target) return;

        nextPosition = GetNextPosition();
        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, smoothTime);
    }

    private Vector3 GetNextPosition()
    {
        float yPos = transform.position.y;
        yDifference = Mathf.Abs(target.position.y - transform.position.y);

        if (yDifference >= yThreshold) {
            yPos = target.position.y + offset.y;
        }
        
        Vector3 nextPos = new Vector3(
            target.position.x + offset.x,
            yPos,
            transform.position.z
        );

        return nextPos;
        return target.position + new Vector3(
            offset.x,
            offset.y,
            transform.position.z
        );
    }
}