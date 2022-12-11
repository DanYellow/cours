using UnityEngine;
using System.Collections;

public class PlayerHealth : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;
    public Animator animator;

    public SpriteRenderer spriteRenderer;

    private bool isInvincible = false;
    float invincibilityFlashDelay = 0.2f;
    float invincibilityTimeAfterHit = 2.5f;


    [Tooltip("Please uncheck it on production")]
    public bool needResetHP = true;

    private void Awake()
    {
        if (needResetHP || currentHealth.CurrentValue <= 0)
        {
            currentHealth.CurrentValue = maxHealth.CurrentValue;
        }
    }

    private void Update()
    {
        #if UNITY_EDITOR
        if (Input.GetKeyDown(KeyCode.F9))
        {
            Die();
        }
        #endif
    }

    public void TakeDamage(float damage)
    {
        if (isInvincible) return;
        
        currentHealth.CurrentValue -= damage;
        if (currentHealth.CurrentValue <= 0)
        {
            Die();
        } else {
            StartCoroutine(HandleInvincibilityDelay());
            StartCoroutine(InvincibilityFlash());
        }
    }

    private void Die()
    {
        onPlayerDeath.Raise();
        transform.Rotate(0f, 0f, 45f);
        animator.SetTrigger("OnPlayerDeath");
    }

    public void OnPlayerDeathAnimationCallback()
    {
        gameObject.GetComponent<SpriteRenderer>().enabled = false;
    }

    public IEnumerator InvincibilityFlash()
    {
        while (isInvincible)
        {
            spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            yield return new WaitForSeconds(invincibilityFlashDelay);
            spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            yield return new WaitForSeconds(invincibilityFlashDelay);
        }
    }

    public IEnumerator HandleInvincibilityDelay()
    {
        isInvincible = true;
        yield return new WaitForSeconds(invincibilityTimeAfterHit);
        isInvincible = false;
    }

    public bool IsInvincible()
    {
        return isInvincible;
    }
}
