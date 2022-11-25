using UnityEngine;

public class WaypointManager : MonoBehaviour
{
    public float speed = 1.3f;
    public Transform[] listWaypoints;
    private int currentWaypointIndex = 0;
    private Vector3 nextPosition;

    void Start()
    {
        nextPosition = listWaypoints[0].position;
    }

    void Update()
    {
        Vector3 dir = nextPosition - transform.position;
        transform.Translate(dir.normalized * speed * Time.deltaTime, Space.World);

        if(Vector3.Distance(transform.position, nextPosition) < 0.1f)
        {
            currentWaypointIndex = (currentWaypointIndex + 1) % listWaypoints.Length;
            nextPosition = listWaypoints[currentWaypointIndex].position;
        }
    }
}
