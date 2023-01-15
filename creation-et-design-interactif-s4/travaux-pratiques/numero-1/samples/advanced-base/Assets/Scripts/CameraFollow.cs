using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Vector2 offset = new Vector2(0, 0f);
    private Vector3 velocity = Vector3.zero;

    public float smoothTime = 0.25f;

    float velocityRefX = 0.0f;
    float velocityRefY = 0.0f;

    [SerializeField]
    private Transform target;

    private Vector3 nextPosition;
    private bool isInAir = false;

    private float nextX = 0;
    private float nextY = 0;

    private Vector3 threshold;

    private Camera selfCamera;

    void Start()
    {
        threshold = calculateThreshold();
        transform.position = GetNextPosition();
    }

    void LateUpdate()
    {


        nextPosition = GetNextPosition();
        if(target.TryGetComponent<PlayerMovement>(out PlayerMovement playerMovement)) {
            isInAir = !playerMovement.IsGrounded();
        }

        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, smoothTime); 
    }

    private Vector3 calculateThreshold() {
        Rect aspect = Camera.main.pixelRect;
        Vector2 t = new Vector2(Camera.main.orthographicSize * aspect.width / aspect.height, Camera.main.orthographicSize);
        t.y *= 0.25f;

        return t;
    }

    private void OnDrawGizmos() {
        Gizmos.color = Color.yellow;
        Vector2 border = calculateThreshold();
        Gizmos.DrawWireCube(transform.position, new Vector3(border.x * 2, border.y * 2, 1));    
    }

    private Vector3 GetNextPosition()
    {
        nextX = target.position.x + (offset.x * (target.localEulerAngles.y > 90 ? -1 : 1));
        nextY = transform.position.y; 
        float yDiff = Vector2.Distance(Vector2.up * transform.position.y, Vector2.up * target.position.y);

        if((Mathf.Abs(yDiff) >= threshold.y || target.position.y != transform.position.y) && !isInAir) {
            nextY = target.position.y;
        }

        return new Vector3(nextX, nextY, transform.position.z); 
    }
}