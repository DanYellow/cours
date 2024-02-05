using UnityEngine;
using UnityEngine.Events;

public class Collectible : MonoBehaviour
{
    public CollectibleVariable data;
    public GameObject collectedEffect;
    public SpriteRenderer spriteRenderer;

    public UnityEvent onPickUp;

    private void Awake() {
        spriteRenderer.sprite = data.sprite;
    }
    
    private void OnTriggerEnter2D(Collider2D collision)
    {
        if (collision.CompareTag("Player"))
        {
            GameObject effect = Instantiate(collectedEffect, transform.position, transform.rotation);
            // Destroy effect after its animation ends playing
            Destroy(effect, effect.GetComponent<Animator>().GetCurrentAnimatorStateInfo(0).length); 

            data.PickItem(transform.position);
            onPickUp?.Invoke();

            Destroy(gameObject);
        }
    }
}
