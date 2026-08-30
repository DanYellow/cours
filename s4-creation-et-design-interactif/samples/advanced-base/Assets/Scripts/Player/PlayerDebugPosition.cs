using UnityEngine;

public class PlayerDebugPosition : MonoBehaviour
{
    #if UNITY_EDITOR
    [SerializeField]
    private Transform debugTransform;

    [SerializeField]
    private bool isEnabled = true;


    void Awake()
    {
        if (debugTransform && isEnabled)
        {
            transform.position = debugTransform.position;
        }
    }
    #endif
}
