using UnityEngine;

public class Coin : MonoBehaviour
{
    public enum Value {
        Standard = 1,
        Gem = 5,
    }

    public Value value;

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.CompareTag("Player"))
        {
            PlayerInventory.instance.AddCoins((int)value);
            Destroy(gameObject);
        }
    }
}
