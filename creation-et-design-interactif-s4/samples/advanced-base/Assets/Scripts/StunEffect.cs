using UnityEngine;

// https://forum.unity.com/threads/how-to-make-a-gameobject-rotate-and-move-around-another-gameobject-in-2d.1397125/
public class StunEffect : MonoBehaviour
{
    public float rotationSpeed = 5;

    [SerializeField]
    private float oscillationSpeed = 3;

    [SerializeField]
    private SpriteRenderer sr;

    public Transform pivot;

    private float xOffset = 0;
    private float zOffset = 0;

    [SerializeField]
    private float yAmplitude = -0.02f;

    public AnimationCurve animationCurve;

    private Vector3 startAngle;   //Reference to the object's original angle values
    private float rotationOffset = 50f; //Rotate by 50 units

    private float finalAngle;  //Keeping track of final angle to keep code cleaner

    private float timeElapsed;
    private float speedFactor;

    public float phaseShift = 0;

    private void Start()
    {
        startAngle = transform.eulerAngles;

        xOffset = (transform.position - pivot.position).x;
        zOffset = (transform.position - pivot.position).z;
    }

    void Update()
    {
        // return;
        speedFactor = animationCurve.Evaluate(timeElapsed);

        // Factor to decrease z axis rotation's speed
        timeElapsed += 0.000000025f;
        // 1.5 * cos(L(0, 2 * pi))
        // 1.5 * sin(L(0, 2 * pi))
        // y = a*sin(2*pi*f*t )
        float newY = (Mathf.Sin(Time.time * 5f) * yAmplitude) + pivot.position.y;

        float newSpeed = Mathf.Round(rotationSpeed * speedFactor);

        float angle = Time.time * newSpeed * Mathf.Sign(xOffset);
        var positionCenterObject = pivot.position;

        var x = positionCenterObject.x + (Mathf.Cos(angle + phaseShift) * xOffset);
        var z = positionCenterObject.z + (Mathf.Sin(angle + phaseShift) * zOffset);
        transform.position = new Vector3(x, newY, z);

        finalAngle = startAngle.z + Mathf.Sin(Time.time * oscillationSpeed) * rotationOffset;  //Calculate animation angle
        transform.eulerAngles = new Vector3(startAngle.x, startAngle.y, finalAngle); //Apply new angle to object
    }

    public void ToggleVisiblity(bool isVisible)
    {
        if (isVisible)
        {
            sr.color = Color.white;
        }
        else
        {
            sr.color = Color.clear;
        }
    }
}
