using UnityEngine;

public class Test : MonoBehaviour
{
    public GameObjectEventChannelSO gameEvent;
    public Vector2 roomToDisplay;
    public Transform previousRoom;
    public Transform nextRoom;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            if (other.transform.position.x < transform.position.x)
            {
                roomToDisplay = nextRoom.position;
                gameEvent.Raise(gameObject);
            }
            else
            {
                roomToDisplay = previousRoom.position;
                gameEvent.Raise(gameObject);
            }
        }
    }
}
