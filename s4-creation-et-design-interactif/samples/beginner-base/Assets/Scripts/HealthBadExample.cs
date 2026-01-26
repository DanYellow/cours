using System.Collections;
using UnityEngine;

public class HealthBadExample : MonoBehaviour
{
    [UnityEngine.Serialization.FormerlySerializedAs("rotationAmount")]
    public float maxHealth;
    [ReadOnlyInspector]
    public float currentHealth;

    public FillStatusBarBadExample healthBar;
    public GameObject gameOverScreen;

    public SpriteRenderer spriteRenderer;

    bool isInvincible = false;

    public float invincibilityFlashInterval = 0.2f;
    public float invincibilityDuration = 2.5f;

    private void Start()
    {
        currentHealth = maxHealth;
        healthBar.SetHealth(currentHealth / maxHealth);
    }

    private void Update()
    {
        if (Input.GetKeyDown(KeyCode.F9))
        {
            Die();
        }

        if (Input.GetKeyDown(KeyCode.H))
        {
            TakeDamage(10);
        }
    }

    public void TakeDamage(float damage)
    {
        if (isInvincible) return;

        currentHealth -= damage;
        healthBar.SetHealth(currentHealth / maxHealth);

        if (currentHealth <= 0)
        {
            Die();
        }
        else
        {
            StartCoroutine(InvincibilityFlash());
        }
    }

    private void Die()
    {
        gameOverScreen.SetActive(true);
        this.gameObject.transform.Rotate(0f, 0f, 45f);
    }

    public IEnumerator InvincibilityFlash()
    {
        float timeElapsed = 0f;
        isInvincible = true;

        bool isVisible = true;

        var pauseCoroutine = new WaitForSeconds(invincibilityFlashInterval);

        while (timeElapsed < invincibilityDuration)
        {
            timeElapsed += invincibilityFlashInterval;

            if (isVisible)
            {
                spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            }
            else
            {
                spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            }

            isVisible = !isVisible;

            yield return pauseCoroutine;
        }

        spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
        isInvincible = false;
    }

    public bool IsInvincible()
    {
        return isInvincible;
    }
}
