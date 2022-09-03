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
            Player player = other.GetComponent<Player>();
            player.AddCoins((int)value);
            Destroy(gameObject);
        }
    }
}
