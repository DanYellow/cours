using UnityEngine;

public class Rotate : MonoBehaviour
{
    [Range(1, 3)]
    public float speed = 1;
    // Update is called once per frame
    void Update()
    {
        transform.Rotate(0, 0, 360 * -speed * Time.deltaTime);
    }
}
