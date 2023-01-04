using UnityEngine;

public class ObjectFollow : MonoBehaviour
{
    public Transform TargetToFollow;

    private Vector3 Offset;

    void Start()
    {
        Offset = transform.position - TargetToFollow.position;
    }

    void LateUpdate()
    {
        transform.position = TargetToFollow.position + Offset;
    }
}