using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    public HealthVariable playerHealth;

    
    public Animator animator;

    public SpriteRenderer sr;

    public PlayerInvulnerable playerInvulnerable;

    [Tooltip("Please uncheck it on production")]
    public bool needResetHP = true;

    [Header("Debug")]
    public VoidEventChannel onDebugDeathEvent;

    [Header("Broadcast event channels")]
    public VoidEventChannel onPlayerDeath;

    private void Awake()
    {
        if (needResetHP || playerHealth.currentValue <= 0)
        {
            playerHealth.currentValue = playerHealth.maxValue;
        }
    }

    private void OnEnable()
    {
        onDebugDeathEvent.OnEventRaised += Die;
    }

    public void TakeDamage(float damage)
    {
        if (playerInvulnerable.isInvulnerable && damage < float.MaxValue) return;

        playerHealth.currentValue -= damage;
        if (playerHealth.currentValue <= 0)
        {
            Die();
        }
        else
        {
            StartCoroutine(playerInvulnerable.Invulnerable());
        }
    }

    private void Die()
    {
        onPlayerDeath?.Raise();
        GetComponent<Rigidbody2D>().simulated = false;
        transform.Rotate(0f, 0f, 45f);
        animator.SetTrigger("Death");
    }

    public void OnPlayerDeathAnimationCallback()
    {
        sr.enabled = false;
    }

    private void OnDisable()
    {
        onDebugDeathEvent.OnEventRaised -= Die;
    }
}
