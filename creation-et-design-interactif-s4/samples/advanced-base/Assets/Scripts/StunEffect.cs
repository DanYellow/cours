using UnityEngine;

public class StunEffect : MonoBehaviour
{
    [SerializeField]
    private Camera cam;

    [SerializeField]
    private float rotationSpeed = 150;

    [SerializeField]
    private Transform pivot;

    void LateUpdate()
    {
        transform.LookAt(cam.transform.position, Vector2.up);

        transform.RotateAround(
            pivot.up + pivot.position,
            -transform.up,
            Time.deltaTime * rotationSpeed
        );
    }
}
