using UnityEngine;
using System.Collections;

public class PlayerHealth : MonoBehaviour
{
    public HealthVariable playerHealth;

    public VoidEventChannelSO onPlayerDeath;
    public Animator animator;

    public SpriteRenderer spriteRenderer;

    private bool isInvincible = false;

    public float invincibilityFlashDelay = 0.2f;
    public float invincibilityTimeAfterHit = 2.5f;


    [Tooltip("Please uncheck it on production")]
    public bool needResetHP = true;

    [Header("Debug")]
    public VoidEventChannelSO onDebugDeathEvent;

    private void Awake()
    {
        if (needResetHP || playerHealth.currentValue <= 0)
        {
            playerHealth.currentValue = playerHealth.maxValue;
        }
    }

    private void OnEnable() {
        onDebugDeathEvent.OnEventRaised += Die;
    }

    private void Update()
    {
#if UNITY_EDITOR
        if (Input.GetKeyDown(KeyCode.N))
        {
            Die();
        }

        if (Input.GetKeyDown(KeyCode.O))
        {
            TakeDamage(0);
        }
#endif
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

    private void OnDisable() {
        onDebugDeathEvent.OnEventRaised -= Die;
    }
}
