using UnityEngine;

public class Collectible : MonoBehaviour
{
    public CollectibleVariable data;
    // public AudioClip audioClip;
    public GameObject collectedEffect;
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            // AnyContainer sc = gameObject.AddComponent(typeof(AnyContainer)) as AnyContainer;
            // sc.content = audioClip;

            GameObject effect = Instantiate(collectedEffect, transform.position, transform.rotation);
            Destroy (effect, effect.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).length); 

            // onPickUpItem.Raise(gameObject);
            Destroy(gameObject);
        }
    }
}
