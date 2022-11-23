using UnityEngine;

public class PickupItem : MonoBehaviour
{
    public GameObjectEventChannelSO onPickUpItem;
    public AudioClip audioClip;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            onPickUpItem.Raise(gameObject);
            Destroy(gameObject);
        }
    }
}
