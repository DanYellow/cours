using UnityEngine;

public class Pendulum : MonoBehaviour
{
    public Rigidbody2D rb;

    public float speed;

    [Header("Attention : Values are Quaterion not Euler Angles. You can compute it with an online calculator")]
    public float leftAngleLimit;
    public float rightAngleLimit;

    private int speedFactor;

    private bool isMovingClockwise = true;

    private void Update() {
        Move();
    }

    public void Move()
    {
        ChangeDirection();
        speedFactor = isMovingClockwise ? 1 : -1;
        rb.angularVelocity = speed * speedFactor;
    }

    public void ChangeDirection()
    {
        if (transform.rotation.z > rightAngleLimit)
        {
            isMovingClockwise = false;
        }
        if (transform.rotation.z < leftAngleLimit)
        {
            isMovingClockwise = true;
        }
    }
}
