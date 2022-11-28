using UnityEngine;

public class Checkpoint : MonoBehaviour
{
    // public GameObjectEventChannelSO onCheckpointReached;
    public Vector3Variable currentCheckpoint;
    public BoxCollider2D bc2d;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            bc2d.enabled = false;
            // currentCheckpoint.CurrentValue = transform.position;
            // gameObject.transform.Find("Graphics").gameObject.GetComponent<Animator>().enabled = true;
        }
    }
}
