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

    private PlayerMovement playerMovement = null;

    private Vector3 threshold;

    void Start()
    {
        threshold = calculateThreshold();
        nextPosition = GetNextPosition();
        nextY = target.position.y;
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
            Debug.Log("isFalling " + isFalling);
        }

        transform.position = Vector3.SmoothDamp(transform.position, nextPosition, ref velocity, isFalling ? moveSpeed * 20.75f : moveSpeed );
    }

    private Vector3 calculateThreshold()
    {
        Rect aspect = Camera.main.pixelRect;
        Vector2 t = new Vector2(Camera.main.orthographicSize * (aspect.width / aspect.height), Camera.main.orthographicSize);
        // t.x -= offset.x;
        t.y -= offset.y;

        return t;
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.yellow;
        Vector2 border = calculateThreshold();
        Gizmos.DrawWireCube(transform.position, new Vector3(border.x * 2, border.y * 2, 1));

        Gizmos.color = Color.white;
        Gizmos.DrawLine(Vector2.up * transform.position.y, Vector2.up * target.position.y);
    }

    private Vector3 GetNextPosition()
    {
        nextX = target.position.x;
        
        float yDiff = Vector2.Distance(Vector2.up * transform.position.y, Vector2.up * target.position.y);

        if (Mathf.Abs(yDiff) >= threshold.y && (isFalling || isGrounded)) {
            nextY = target.position.y;
        }

        return new Vector3(nextX, nextY, transform.position.z);
    }
}
