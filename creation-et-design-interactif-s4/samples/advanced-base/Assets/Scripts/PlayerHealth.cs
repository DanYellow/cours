using UnityEngine;
using System.Collections;

public class PlayerHealth : MonoBehaviour
{
    public HealthVariable playerHealth;

    public VoidEventChannel onPlayerDeath;
    public Animator animator;

    public SpriteRenderer spriteRenderer;

    private bool isInvincible = false;

    public float invincibilityFlashDelay = 0.2f;
    public float invincibilityTimeAfterHit = 2.5f;

    private WaitForSeconds waitInvincibilityFlashDelay;
    private WaitForSeconds waitInvincibilityTimeAfterHit;


    [Tooltip("Please uncheck it on production")]
    public bool needResetHP = true;

    [Header("Debug")]
    public VoidEventChannel onDebugDeathEvent;

    private void Awake()
    {
        if (needResetHP || playerHealth.currentValue <= 0)
        {
            playerHealth.currentValue = playerHealth.maxValue;
        }
        waitInvincibilityFlashDelay = new WaitForSeconds(invincibilityFlashDelay);
        waitInvincibilityTimeAfterHit = new WaitForSeconds(invincibilityTimeAfterHit);
    }

    private void OnEnable() {
        onDebugDeathEvent.OnEventRaised += Die;
    }
 
    public void TakeDamage(float damage)
    {
        if (isInvincible && damage < float.MaxValue) return;

        playerHealth.currentValue -= damage;
        if (playerHealth.currentValue <= 0)
        {
            Die();
        }
        else
        {
            StartCoroutine(HandleInvincibilityDelay());
            StartCoroutine(InvincibilityFlash());
        }
    }

    private void Die()
    {
        onPlayerDeath.Raise();
        GetComponent<Rigidbody2D>().simulated = false;
        transform.Rotate(0f, 0f, 45f);
        animator.SetTrigger("OnPlayerDeath");
    }

    public void OnPlayerDeathAnimationCallback()
    {
        GetComponent<SpriteRenderer>().enabled = false;
    }

    public IEnumerator InvincibilityFlash()
    {
        while (isInvincible)
        {
            spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            yield return waitInvincibilityFlashDelay;
            spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            yield return waitInvincibilityFlashDelay;
        }
    }

    public IEnumerator HandleInvincibilityDelay()
    {
        isInvincible = true;
        yield return waitInvincibilityTimeAfterHit;
        isInvincible = false;
    }

    private void OnDisable() {
        onDebugDeathEvent.OnEventRaised -= Die;
    }
}
