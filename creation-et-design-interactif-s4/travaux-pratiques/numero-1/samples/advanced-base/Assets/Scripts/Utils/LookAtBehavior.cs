using UnityEngine;

/**
* @description Allow any Gameobject to look towards another one
**/
public class LookAtBehavior : MonoBehaviour
{
    public Transform target;
    public bool isFacingRight = true;
    public float thresholdDistanceBeforeLookAt = 1 / 0f;

    // Update is called once per frame
    void Update()
    {
        if(Vector2.Distance(target.position, transform.position) > thresholdDistanceBeforeLookAt) {
            return;
        }

        if (target.position.x > transform.position.x && !isFacingRight || target.position.x < transform.position.x && isFacingRight)
        {
            isFacingRight = !isFacingRight;
            transform.Rotate(0f, 180f, 0f);
        }
    }
}
