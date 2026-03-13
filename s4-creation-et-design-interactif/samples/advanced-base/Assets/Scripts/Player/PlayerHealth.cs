using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    [SerializeField]
    private Animator animator;

    [SerializeField]
    private SpriteRenderer sr;

    [SerializeField]
    private PlayerInvulnerable playerInvulnerable;

    [Tooltip("Please uncheck it if the health is carry on"), SerializeField]
    private bool needResetHP = true;

    [Header("ScriptableObjects"), SerializeField]
    private PlayerData playerData;

    [Header("Debug"), SerializeField]
    private VoidEventChannel onDebugDeathEvent;

    [Header("Broadcast event channels")]
    private VoidEventChannel onPlayerDeath;

    private void Awake()
    {
        if (needResetHP || playerData.currentHealth <= 0)
        {
            playerData.currentHealth = playerData.maxHealth;
        }
    }

    private void OnEnable()
    {
        onDebugDeathEvent.OnEventRaised += Die;
    }

    public void TakeDamage(float damage)
    {
        if (playerInvulnerable.isInvulnerable && damage < float.MaxValue) return;

        playerData.currentHealth -= damage;
        if (playerData.currentHealth <= 0)
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
        Debug.Log($"<color=#FF0000>GAME OVER</color>");
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
