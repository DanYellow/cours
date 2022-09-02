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

    private Key currentKey;


    // Start is called before the first frame update
    void Awake()
    {
        playerHealth.onDamage += TakeDamage;
        playerHealth.onDie += Die;
    }

    // LoadLevelManager.instance.PlayerDie();

    void TakeDamage()
    {
        _isInvincible = true;
        StartCoroutine(InvincibilityFlash());
        StartCoroutine(HandleInvincibilityDelay());
    }

     public void Die()
    {
        // Disable playermovement
        
        //  PlayerMovement.instance.enabled = false;
        // PlayerMovement.instance.animator.SetTrigger("Die");
        // PlayerMovement.instance.rb.bodyType = RigidbodyType2D.Kinematic;
        // PlayerMovement.instance.rb.velocity = Vector3.zero;
        // PlayerMovement.instance.playerCollider.enabled = false;
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

    public void SetKey(Key key) {
        currentKey = key;
    }

    public Key GetKey() {
        return currentKey;
    }
}
