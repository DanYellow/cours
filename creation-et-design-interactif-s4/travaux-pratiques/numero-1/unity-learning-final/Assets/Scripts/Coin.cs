using UnityEngine;

public class Coin : MonoBehaviour
{
    public enum Value {
        Standard = 1,
        Gem = 5,
    }

    public Value value;
    public AudioClip clip;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            AudioManager.instance.PlayClipAt(clip, transform.position);
            PlayerInventory.instance.AddCoins((int)value);
            GetComponent<SpriteRenderer>().enabled = false;
            Destroy(gameObject, clip.length);
        }
    }

    public void TestValue (int value) {
        Debug.Log("value " + value);
    }
}
