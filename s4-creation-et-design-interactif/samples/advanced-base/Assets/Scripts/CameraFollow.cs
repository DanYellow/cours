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
        if (!target) return;

        nextPosition = GetNextPosition();
        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, smoothTime);
    }

    public Vector3 GetNextPosition()
    {
        float targetDirection = Mathf.Sign(target.localScale.x);
        return new Vector3(
            (offset.x * targetDirection) + target.position.x,
            offset.y + target.position.y,
            transform.position.z
        );
    }
}
