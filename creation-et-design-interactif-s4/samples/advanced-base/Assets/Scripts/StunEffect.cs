using UnityEngine;

// https://forum.unity.com/threads/how-to-make-a-gameobject-rotate-and-move-around-another-gameobject-in-2d.1397125/
public class StunEffect : MonoBehaviour
{
    public float rotationSpeed = 5;

    [SerializeField]
    private float oscillationSpeed = 3;

    public Transform pivot;

    private float xOffset = 0;
    private float zOffset = 0;

    [SerializeField]
    private float yAmplitude = -0.02f;

    public AnimationCurve animationCurve;

    Vector3 startAngle;   //Reference to the object's original angle values
    float rotationOffset = 50f; //Rotate by 50 units

    float finalAngle;  //Keeping track of final angle to keep code cleaner

    float timeElapsed;

    float speedFactor;


    private void Start()
    {
        startAngle = transform.eulerAngles;

        xOffset = (transform.position - pivot.position).x;
        zOffset = (transform.position - pivot.position).z;

        // animationCurve = new AnimationCurve(new Keyframe(0, 1), new Keyframe(1, 1));

        // animationCurve.preWrapMode = WrapMode.PingPong;
        // animationCurve.postWrapMode = WrapMode.PingPong;
    }

    void Update()
    {
        speedFactor = animationCurve.Evaluate(timeElapsed);


        timeElapsed += 0.000000025f;
        // 1.5 * cos(L(0, 2 * pi))
        // 1.5 * sin(L(0, 2 * pi))
        float newY = (Mathf.Sin(Time.time * 5f) * yAmplitude) + pivot.position.y;

        float newSpeed = Mathf.Round(rotationSpeed * speedFactor);

        float angle = Time.time * newSpeed * Mathf.Sign(xOffset);
        var positionCenterObject = pivot.position;

        var x = positionCenterObject.x + (Mathf.Cos(angle) * xOffset);
        var z = positionCenterObject.z + (Mathf.Sin(angle) * zOffset);
        transform.position = new Vector3(x, newY, z);

        finalAngle = startAngle.z + Mathf.Sin(Time.time * oscillationSpeed) * rotationOffset;  //Calculate animation angle
        transform.eulerAngles = new Vector3(startAngle.x, startAngle.y, finalAngle); //Apply new angle to object
    }
}
