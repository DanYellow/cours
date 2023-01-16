using UnityEngine;

public class CameraFollowSuperMarioStyle : MonoBehaviour
{
    [Tooltip("Area where the target is considerer as inside the field of view")]
    public Vector2 offset = Vector2.zero;

    public float moveSpeed = 0.25f;

    [Tooltip("When the camera considers the target has moved")]
    public float thresholdBeforeMove = 4f;

    [SerializeField]
    private Transform target;

    private Vector3 nextPosition;

    float velocityRefY = 0;
    private bool isFalling = false;
    private bool isGrounded = true;

    private float nextY = 0;

    private float lastTargetY = 0;

    private PlayerMovement playerMovement = null;

    private Vector3 threshold;

    float newY = 0;

    void Start()
    {
        threshold = calculateThreshold();
        nextPosition = GetNextPosition();

        nextY = target.position.y;
        lastTargetY = target.position.y;
        transform.position = new Vector3(nextPosition.x, target.position.y, nextPosition.z);

        playerMovement = target.GetComponent<PlayerMovement>();
    }

    void LateUpdate()
    {
        nextPosition = GetNextPosition();
        if (playerMovement != null)
        {
            isFalling = playerMovement.IsFalling();
            isGrounded = playerMovement.onGround;
        }

        newY = Mathf.SmoothDamp(transform.position.y, nextPosition.y, ref velocityRefY, moveSpeed, Mathf.Infinity, isFalling ? Time.deltaTime * 3 : Time.deltaTime);
        transform.position = new Vector3(nextPosition.x, newY, transform.position.z); ;
    }

    private Vector3 calculateThreshold()
    {
        Rect aspect = Camera.main.pixelRect;
        Vector2 t = new Vector2(Camera.main.orthographicSize * (aspect.width / aspect.height), Camera.main.orthographicSize);
        t.y -= offset.y;

        return t;
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.yellow;
        Vector2 border = calculateThreshold();
        Gizmos.DrawWireCube(transform.position, new Vector3(border.x * 2, border.y * 2, 1));
    }

    private Vector3 GetNextPosition()
    {
        Vector3 localPosition = transform.InverseTransformDirection(target.position - transform.position);

        bool hasReachedBottomThreshold = (localPosition.y <= -threshold.y) && isFalling;
        bool hasReachedTopThreshold = (localPosition.y >= threshold.y || localPosition.y <= -threshold.y) && isGrounded && (lastTargetY < target.position.y - thresholdBeforeMove || lastTargetY > target.position.y + thresholdBeforeMove);

        if (hasReachedTopThreshold || hasReachedBottomThreshold)
        {
            lastTargetY = target.position.y;
            nextY = target.position.y;
        }

        return new Vector3(target.position.x, nextY, transform.position.z);
    }
}
