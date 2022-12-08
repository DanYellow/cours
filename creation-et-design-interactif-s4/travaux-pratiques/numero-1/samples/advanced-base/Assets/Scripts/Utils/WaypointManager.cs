using UnityEngine;

public class WaypointManager : MonoBehaviour
{
    public float speed = 1.3f;
    public Transform[] listWaypoints;
    private int currentWaypointIndex = 0;
    private Vector3 nextPosition;

    bool countUp = true;

    public bool modePingPong = false;

    void Awake()
    {
        nextPosition = listWaypoints[0].position;
        transform.position = nextPosition;
    }

    void Update()
    {
        Vector3 dir = nextPosition - transform.position;
        transform.Translate(dir.normalized * speed * Time.deltaTime, Space.World);

        if(Vector3.Distance(transform.position, nextPosition) < 0.1f)
        {
            if(modePingPong) {
                currentWaypointIndex = PingPong(currentWaypointIndex);
            } else {
                currentWaypointIndex = (currentWaypointIndex + 1) % listWaypoints.Length;
            }

            nextPosition = listWaypoints[currentWaypointIndex].position;
        }
    }

    private int PingPong(int currentValue)
    {
        int nextValue = currentValue;
        if (nextValue <= listWaypoints.Length && countUp == true)
        {
            nextValue++;
            if (nextValue == listWaypoints.Length)
            {
                countUp = false;
            }
        }
        if (nextValue >= 0 && countUp == false)
        {
            nextValue--; 
            if (nextValue == 0)
            {
                countUp = true;
            }
        }

        return nextValue;
    }
}
