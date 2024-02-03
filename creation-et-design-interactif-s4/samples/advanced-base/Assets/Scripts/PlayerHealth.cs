using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    public HealthVariable playerHealth;

    public VoidEventChannel onPlayerDeath;
    public Animator animator;

    public SpriteRenderer spriteRenderer;

    public PlayerInvulnerable playerInvulnerable;


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
    }

    private void OnEnable() {
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
        onPlayerDeath.Raise();
        GetComponent<Rigidbody2D>().simulated = false;
        transform.Rotate(0f, 0f, 45f);
        animator.SetTrigger("OnPlayerDeath");
    }

    public void OnPlayerDeathAnimationCallback()
    {
        GetComponent<SpriteRenderer>().enabled = false;
    }

    private void OnDisable() {
        onDebugDeathEvent.OnEventRaised -= Die;
    }
}
