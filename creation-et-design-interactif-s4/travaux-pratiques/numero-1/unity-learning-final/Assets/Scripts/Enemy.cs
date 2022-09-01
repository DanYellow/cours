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

                // StartCoroutine(TakeDamage(other.gameObject));
                // Time.timeScale = 0.05f;
                playerAnimator.speed = 0.5f;
                playerAnimator.SetTrigger("StompedEnemy");
                other.gameObject.GetComponent<Rigidbody2D>().velocity += Vector2.up * 5f;
                // Time.timeScale = 1f;
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

    IEnumerator TakeDamage(GameObject other)
    {
        Animator playerAnimator = other.GetComponent<Animator>();
        Time.timeScale = 0.5f;
        playerAnimator.SetTrigger("StompedEnemy");
        Debug.Log("playerAnimator" + playerAnimator.GetCurrentAnimatorStateInfo(0).length);
        yield return new WaitForSeconds(playerAnimator.GetCurrentAnimatorStateInfo(0).length * 10);
        other.GetComponent<Rigidbody2D>().velocity += Vector2.up * 5f;
        Time.timeScale = 1f;
    }
}

