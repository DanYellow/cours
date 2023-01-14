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
    private bool isTargetGrounded = true;

    void Start()
    {
        transform.position = GetNextPosition();
    }

    void LateUpdate()
    {
        nextPosition = GetNextPosition();
        isTargetGrounded = target.GetComponent<PlayerMovement>().IsGoingUp();

        float ySmoothTime = isTargetGrounded ? smoothTime : 0;

        float newX = Mathf.SmoothDamp(transform.position.x, target.position.x, ref velocityRefX, smoothTime);
        float newY = transform.position.y; 
        if(!isTargetGrounded) {
            newY = Mathf.SmoothDamp(transform.position.y, target.position.y, ref velocityRefY, smoothTime);
        }

        transform.position = new Vector3(newX, newY, transform.position.z); 
        // Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, smoothTime);
    }

    // private Vector3 GetNextPosition()
    // {
    //     isTargetGrounded = target.GetComponent<PlayerMovement>().IsGrounded();
    //     Vector3 targetPosition = new Vector3(
    //         target.position.x,
    //         (isTargetGrounded ? target.position.y : transform.position.y),
    //         target.position.z
    //     );

    //     return targetPosition + new Vector3(
    //         (offset.x * (target.localEulerAngles.y > 90 ? -1 : 1)),
    //         offset.y,
    //         transform.position.z
    //     );
    // }

    private Vector3 GetNextPosition()
    {
        return target.position + new Vector3(
            (offset.x * (target.localEulerAngles.y > 90 ? -1 : 1)),
            offset.y,
            transform.position.z
        );
    }
}