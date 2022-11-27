using UnityEngine;

public class PickupItem : MonoBehaviour
{
    public GameObjectEventChannelSO onPickUpItem;
    public AudioClip audioClip;
    public GameObject collectedEffect;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            AnyContainer sc = gameObject.AddComponent(typeof(AnyContainer)) as AnyContainer;
            sc.content = audioClip;

            GameObject impactEffect = Instantiate(collectedEffect, transform.position, transform.rotation);
            Destroy (impactEffect, impactEffect.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).length); 

            onPickUpItem.Raise(gameObject);
            Destroy(gameObject);
        }
    }
}
