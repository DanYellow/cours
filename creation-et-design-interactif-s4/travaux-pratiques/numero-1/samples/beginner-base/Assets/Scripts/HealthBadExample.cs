using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;

public class HealthBadExample : MonoBehaviour
{
    [UnityEngine.Serialization.FormerlySerializedAs("rotationAmount")]
    public float maxHealth;
    [ReadOnlyInspector]
    public float currentHealth;

    public FillStatusBarBadExample healthBar;
    public GameObject gameOverScreen;

    public UnityEvent onPlayerDeath;
    public SpriteRenderer spriteRenderer;

    bool isInvincible = false;
    // public bool isInvincible { get; private set; } = false;

    float invincibilityFlashDelay = 0.2f;
    float invincibilityTimeAfterHit = 2.5f;

    private void Start()
    {
        currentHealth = maxHealth;
        healthBar.SetHealth(currentHealth / maxHealth);
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.Alpha9))
        {
            Die();
        }

        if (Input.GetKeyDown(KeyCode.M))
        {
            TakeDamage(10);
            Debug.Log(Input.GetKey(KeyCode.Return));
        }
    }

    public void TakeDamage(float damage)
    {
        if(isInvincible) return;

        currentHealth -= damage;
        healthBar.SetHealth(currentHealth / maxHealth);

        if (currentHealth <= 0)
        {
            Die();
        } else {
            StartCoroutine(HandleInvincibilityDelay());
            StartCoroutine(InvincibilityFlash());
        }
    }

    private void Die()
    {
        gameOverScreen.SetActive(true);
        this.gameObject.transform.Rotate(0f, 0f, 45f);
        onPlayerDeath.Invoke();
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

    public bool IsInvincible() {
        return isInvincible;
    }
}
