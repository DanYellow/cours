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

    void Start()
    {
        transform.position = GetNextPosition();
    }

    void LateUpdate()
    {
        nextPosition = GetNextPosition();
        if(target.TryGetComponent<PlayerMovement>(out PlayerMovement playerMovement)) {
            isInAir = playerMovement.IsGoingUp();
        }

        transform.position = nextPosition; 
    }

    private Vector3 GetNextPosition()
    {
        nextX = Mathf.SmoothDamp(transform.position.x, target.position.x + (offset.x * (target.localEulerAngles.y > 90 ? -1 : 1)), ref velocityRefX, smoothTime);
        nextY = Mathf.SmoothDamp(transform.position.y, target.position.y + offset.y, ref velocityRefY, smoothTime); 
        if(isInAir) {
            nextY = transform.position.y;
        }

        return new Vector3(nextX, nextY, transform.position.z); 
    }
}