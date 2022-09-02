using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Key : MonoBehaviour
{
    private bool isFollowingPlayer = false;
    public Transform followTarget;
    public float followSpeed;

    private float oscillationSpeed = 2f;
    private float oscillationHeight = 0.15f;
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {
        if (isFollowingPlayer)
        {
            float newY = (Mathf.Sin(Time.time * oscillationSpeed) * oscillationHeight) + followTarget.position.y;

            transform.position = Vector2.Lerp(
                transform.position,
                new Vector3(followTarget.position.x, newY, followTarget.position.z),
                followSpeed * Time.deltaTime
            );
        }
    }

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            other.gameObject.GetComponent<Player>().SetKey(this);
            isFollowingPlayer = true;
        }
    }

    public void SetFollowTarget(Transform transform)
    {
        followTarget = transform;
    }
}
