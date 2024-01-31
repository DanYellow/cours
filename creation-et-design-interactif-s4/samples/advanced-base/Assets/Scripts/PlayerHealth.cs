using UnityEngine;
using System.Collections;

public class PlayerHealth : MonoBehaviour
{
    public HealthVariable playerHealth;

    public VoidEventChannel onPlayerDeath;
    public Animator animator;

    public SpriteRenderer spriteRenderer;

    private bool isInvincible = false;

    float invincibilityDeltaTime = 0.15f;
    public WaitForSeconds waitInvincibilityDeltaTime;


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
        // Time between loop
        waitInvincibilityDeltaTime = new WaitForSeconds(invincibilityDeltaTime);
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
            StartCoroutine(Invincibility());
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

    public IEnumerator Invincibility()
    {
        
        float invincibilityDuration = 2.5f;
        isInvincible = true;
        for (float i = 0; i < invincibilityDuration; i += invincibilityDeltaTime)
        {
            if(spriteRenderer.color.a == 1) {
                spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            } else {
                spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            }

            yield return waitInvincibilityDeltaTime;
        }

        spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
        isInvincible = false;
    }
    private void OnDisable() {
        onDebugDeathEvent.OnEventRaised -= Die;
    }
}
