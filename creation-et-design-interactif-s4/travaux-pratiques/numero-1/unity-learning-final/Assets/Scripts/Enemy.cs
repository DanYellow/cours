using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Enemy : MonoBehaviour
{
    void OnCollisionEnter2D(Collision2D other)
    {
        if (other.gameObject.CompareTag("Player"))
        {
            if (other.contacts[0].normal.y < -0.5f)
            {
                Collider2D[] listColliders = transform.GetComponents<Collider2D>();
                foreach (Collider2D collider in listColliders)
                {
                    collider.enabled = false;
                }

                Animator playerAnimator = other.gameObject.GetComponent<Animator>();
                Destroy(gameObject, 0.75f);

                Time.timeScale = 0.05f;
                playerAnimator.SetTrigger("StompedEnemy");
                other.gameObject.GetComponent<Rigidbody2D>().velocity += Vector2.up * 5f;
                Time.timeScale = 1f;
            }
            else
            {
                Health playerHealth = other.gameObject.GetComponent<Health>();

                Player player = other.gameObject.GetComponent<Player>();
                if (!player.IsInvisible())
                {
                    playerHealth.TakeDamage(0.5f);
                }
            }
        }
    }
}

