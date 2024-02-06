using UnityEngine;

// https://forum.unity.com/threads/how-to-make-a-gameobject-rotate-and-move-around-another-gameobject-in-2d.1397125/
public class StunEffect : MonoBehaviour
{
    [SerializeField]
    private Camera cam;

    [SerializeField]
    private float rotationSpeed = 150;

    [SerializeField]
    private Transform pivot;

    private Vector3 startPosition;

    private float xOffset = 0;
    private float zOffset = 0;

    [SerializeField]
    private float yAmplitude = -0.02f;

    int i = 0;

    private void Start()
    {
        startPosition = transform.position;
        xOffset = (transform.position - pivot.position).x;
        zOffset = (transform.position - pivot.position).z;

        print("fff " + xOffset);
    }

    void Update()
    {
        float newY = (Mathf.Sin(Time.time * 5f) * yAmplitude) + startPosition.y;
        // Vector3 position = new Vector3(transform.position.x, newY, transform.position.z);

        // transform.position = position;

        var rotation = Time.time * 2;

        // transform.Rotate(new Vector3(0, 0, rotation));
        // transform.RotateAround(pivot.localPosition, new Vector3(0, 1, 0), Time.deltaTime *  rotationSpeed);
        // transform.RotateAround(
        //     pivot.position,
        //     transform.up,
        //     Time.deltaTime * rotationSpeed
        // );

        float angle = Time.time * rotationSpeed * Mathf.Sign(xOffset);
        var positionCenterObject = pivot.localPosition;

        var x = positionCenterObject.x + (Mathf.Cos(angle) * xOffset);
        var z = positionCenterObject.z + (Mathf.Sin(angle) * zOffset);
        transform.position = new Vector3(x, pivot.position.y, z);

    }

    private void LateUpdate()
    {
        // transform.LookAt(cam.transform.position, Vector2.up);
    }

}
