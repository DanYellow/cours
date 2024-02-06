using UnityEngine;

// https://forum.unity.com/threads/how-to-make-a-gameobject-rotate-and-move-around-another-gameobject-in-2d.1397125/
public class StunEffect : MonoBehaviour
{
    [SerializeField]
    private float rotationSpeed = 150;

    [SerializeField]
    private Transform pivot;

    private Vector3 startPosition;

    private float xOffset = 0;
    private float zOffset = 0;

    [SerializeField]
    private float yAmplitude = -0.02f;

    public float offset = -0.5f;

    [SerializeField]
    private bool isOnZAxis = false;

    private void Start()
    {
        startPosition = transform.position;
        // xOffset = -0.5f;
        // zOffset = -0.5f;
        xOffset = (transform.position - pivot.position).x;
        zOffset = (transform.position - pivot.position).z;
    }



    void Update()
    {
        // transform.RotateAround(pivot.position, transform.up, Time.deltaTime * 90f);
        // 1.5 * cos(L(0, 2 * pi))
        // 1.5 * sin(L(0, 2 * pi))
        float newY = (Mathf.Sin(Time.time * 5f) * yAmplitude) + pivot.position.y;

        float angle = Time.time * rotationSpeed * Mathf.Sign(xOffset);
        var positionCenterObject = pivot.position;

        if (isOnZAxis)
        {
            var x = positionCenterObject.x + (Mathf.Cos(angle) * offset);
            var z = positionCenterObject.z + (Mathf.Sin(angle) * offset) + 1.75f;

            transform.position = new Vector3(x, pivot.position.y, z);
        }
        else
        {
            var x = positionCenterObject.x + (Mathf.Cos(angle) * xOffset);
            var z = positionCenterObject.z + (Mathf.Sin(angle) * zOffset);
            transform.position = new Vector3(x, newY, z);
        }
    }

    // private void LateUpdate() {
    //     transform.LookAt(Camera.main.transform.position, Vector3.up);
    // }
}
