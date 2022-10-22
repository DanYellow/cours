using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    private void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.TryGetComponent<Health>(out Health playerHealth) && other.gameObject.CompareTag("Player"))
        {
            playerHealth.TakeDamage(1f);
        }
    }
}
