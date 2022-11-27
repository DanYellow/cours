using UnityEngine;

public class CameraRoomPerRoom : MonoBehaviour
{
    private float currentPosX;
    private Vector3 velocity = Vector3.zero;
    public float smoothTime = 0.25f;

    // Update is called once per frame
    void Update()
    {
        Vector3 targetPosition = new Vector3(
            currentPosX,
            transform.position.y,
            transform.position.z
        );
        transform.position = Vector3.SmoothDamp(transform.position, targetPosition, ref velocity, smoothTime);
    }

    public void MoveToRoomAt(Vector2 nextRoomPosition)
    {
        currentPosX = nextRoomPosition.x;
    }
}
