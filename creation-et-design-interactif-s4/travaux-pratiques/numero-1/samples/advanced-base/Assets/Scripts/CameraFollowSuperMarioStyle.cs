using UnityEngine;

public class CameraFollowSuperMarioStyle : MonoBehaviour
{
    public Vector2 offset = new Vector2(0, 0f);
    private Vector3 velocity = Vector3.zero;

    public float moveSpeed = 0.25f;

    [SerializeField]
    private Transform target;

    private Vector3 nextPosition;
    private bool isFalling = false;
    private bool isGrounded = true;

    private float nextX = 0;
    private float nextY = 0;

    [SerializeField]
    private float lastTargetY = 0;

    private PlayerMovement playerMovement = null;

    private Vector3 threshold;

    void Start()
    {
        threshold = calculateThreshold();
        nextPosition = GetNextPosition();

        nextY = target.position.y;
        lastTargetY = target.position.y;
        transform.position = new Vector3(nextPosition.x, target.position.y, nextPosition.z);

        playerMovement = target.GetComponent<PlayerMovement>();
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.L))
        {
            Debug.Log("threshold.y " + (moveSpeed * 0.25f));
            // Debug.Log("localPosition " + transform.InverseTransformDirection(target.position - transform.position));
        }
    }

    void LateUpdate()
    {
        nextPosition = GetNextPosition();
        if (playerMovement != null)
        {
            isFalling = playerMovement.IsFalling();
            isGrounded = playerMovement.onGround;
        }

        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, isFalling ? moveSpeed : moveSpeed, Mathf.Infinity, isFalling ? Time.deltaTime * 3 : Time.deltaTime);
    }

    private Vector3 calculateThreshold()
    {
        Rect aspect = Camera.main.pixelRect;
        Vector2 t = new Vector2(Camera.main.orthographicSize * (aspect.width / aspect.height), Camera.main.orthographicSize);
        // Debug.Log("t " + transform.InverseTransformDirection(target.position - transform.position));
        // t.x -= offset.x;
        t.y -= offset.y;
        // Debug.Log("aspect " + t); // 12, 4.75

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
        nextX = target.position.x;

        Vector3 localPosition = transform.InverseTransformDirection(target.position - transform.position);

        float delta = 3.5f;
        bool hasReachedBottomThreshold = (localPosition.y <= -threshold.y) && isFalling;
        bool hasReachedTopThreshold = (localPosition.y >= threshold.y || localPosition.y <= -threshold.y) && isGrounded && (lastTargetY < target.position.y - delta || lastTargetY > target.position.y + delta);

        if (hasReachedTopThreshold || hasReachedBottomThreshold)
        {
            lastTargetY = target.position.y;
            // nextY = target.position.y;
        }

        return new Vector3(nextX, nextY, transform.position.z);
    }
}
