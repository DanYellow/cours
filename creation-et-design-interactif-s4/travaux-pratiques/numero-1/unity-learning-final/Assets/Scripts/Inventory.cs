using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Inventory : MonoBehaviour
{
    private void OnTriggerEnter2D(Collider2D other) {
        if(other.CompareTag("Player")) {
            Player player = other.GetComponent<Player>();
            player.AddCoins(1);
        }
    }
}
