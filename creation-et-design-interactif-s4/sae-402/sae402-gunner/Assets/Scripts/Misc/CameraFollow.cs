using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public GameObject player;

    public float delayBeforeFollowPlayer = 0;

    public Vector3 posOffset;

    private Vector3 velocity;

    void Update()
    {
        transform.position = Vector3.SmoothDamp(transform.position, player.transform.position + posOffset, ref velocity, delayBeforeFollowPlayer);
    }
}
