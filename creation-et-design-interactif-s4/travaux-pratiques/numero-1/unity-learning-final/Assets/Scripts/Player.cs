using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public Health playerHealth;
    public SpriteRenderer spriteRenderer;
    float invincibilityFlashDelay = 0.2f;
    float invincibilityTimeAfterHit = 2.5f;
    bool _isInvincible = false;
    public Rigidbody2D rb;

    private int coinsCount;


    // Start is called before the first frame update
    void Awake()
    {
        playerHealth.onDamage += TakeDamage;
        playerHealth.onDie += Die;
    }


    // LoadLevelManager.instance.PlayerDie();

    void TakeDamage()
    {
        if (playerHealth.GetHealth() >= 0)
        {
            _isInvincible = true;
            StartCoroutine(InvincibilityFlash());
            StartCoroutine(HandleInvincibilityDelay());
        }
    }

    public void Die()
    {
        // Désactiver le mouvement
        // Lancer l'animation de mort
        // Arrêter le mouvement
        // Supprimer les collisions

        Debug.Log("Death");

        GetComponent<CapsuleCollider2D>().enabled = false;
        PlayerMovement.instance.enabled = false;
        PlayerMovement.instance.rb.bodyType = RigidbodyType2D.Static;
        PlayerMovement.instance.rb.velocity = Vector3.zero;

        GetComponent<Animator>().SetFloat("VerticalSpeed", 0);
        GetComponent<Animator>().enabled = false;
        GetComponent<Animator>().enabled = true;
        GetComponent<Animator>().SetTrigger("Die");
    }


    public IEnumerator InvincibilityFlash()
    {
        while (_isInvincible)
        {
            spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            yield return new WaitForSeconds(invincibilityFlashDelay);
            spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            yield return new WaitForSeconds(invincibilityFlashDelay);
        }
    }

    public IEnumerator HandleInvincibilityDelay()
    {
        yield return new WaitForSeconds(invincibilityTimeAfterHit);
        _isInvincible = false;
    }

    public bool IsInvisible()
    {
        return _isInvincible;
    }

    private void OnDestroy()
    {
        playerHealth.onDamage -= TakeDamage;
        playerHealth.onDie -= Die;
    }
}
