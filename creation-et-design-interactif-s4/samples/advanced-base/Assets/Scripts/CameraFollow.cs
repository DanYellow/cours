using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Vector3 offset = Vector3.zero;
    private Vector3 velocity = Vector3.zero;

    public float smoothTime = 0.25f;

    [SerializeField]
    private Transform target;

    private Vector3 nextPosition;

    void Start()
    {
        nextPosition = GetNextPosition();
        transform.position = nextPosition;
    }

    void LateUpdate()
    {
        nextPosition = GetNextPosition();
        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, smoothTime);
    }

    private Vector3 GetNextPosition()
    {
        return target.position + new Vector3(
            offset.x,
            offset.y,
            transform.position.z
        );
    }

    private Vector3 calculateThreshold()
    {
        Rect aspect = Camera.main.pixelRect;
        Vector2 t = new Vector2(Camera.main.orthographicSize * aspect.width / aspect.height, Camera.main.orthographicSize);
        t.x -= offset.x;
        t.y -= offset.y;
        return t;
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.blue;
        Vector2 border = calculateThreshold();
        Gizmos.DrawWireCube(transform.position, new Vector3(border.x * 2, border.y * 2, 1));
    }
}