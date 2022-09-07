using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour
{
    public Health health;
    public SpriteRenderer spriteRenderer;
    float invincibilityFlashDelay = 0.2f;
    float invincibilityTimeAfterHit = 2.5f;
    bool _isInvincible = false;
    public Rigidbody2D rb;

    private int coinsCount;

    public Animator animator;

    public HUD heathInfo;

    private void Start() {
        health.onDamage += TakeDamage;
        health.onDie += Die;
        heathInfo.SetHealth(health.GetMaxHealth());
    }


    // LoadLevelManager.instance.PlayerDie();

    void TakeDamage()
    {
        // Debug.Log("Damage");
        if (health.GetHealth() >= 0)
        {
            heathInfo.SetHealth(health.GetHealth());
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

        StartCoroutine(CameraShake.instance.Shake(0.15f));

        GetComponent<CapsuleCollider2D>().enabled = false;
        PlayerMovement.instance.enabled = false;
        PlayerMovement.instance.rb.bodyType = RigidbodyType2D.Static;
        PlayerMovement.instance.rb.velocity = Vector3.zero;

        animator.SetFloat("VerticalSpeed", 0);
        animator.enabled = false;
        animator.enabled = true;
        animator.SetTrigger("Die");

        if(CurrentSceneManager.instance.isPlayerHereByDefault) {
            DontDestroyOnLoadScene.instance.MoveInMainScene();
        } 
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
        health.onDamage -= TakeDamage;
        health.onDie -= Die;
    }
}
