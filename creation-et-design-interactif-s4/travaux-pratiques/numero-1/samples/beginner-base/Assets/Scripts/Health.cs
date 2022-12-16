using UnityEngine;
using System.Collections;

public class Health : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;

    public SpriteRenderer spriteRenderer;

    private bool isInvincible = false;

    float invincibilityFlashDelay = 0.2f;
    float invincibilityTimeAfterHit = 2.5f;


    private void Start()
    {
        // currentHealth = maxHealth;
        currentHealth.CurrentValue = maxHealth.CurrentValue;
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
        }
    }

    public void TakeDamage(float damage)
    {
        //  currentHealth.CurrentValue = Mathf.Clamp(currentHealth.CurrentValue - damage, 0, maxHealth.CurrentValue);
        currentHealth.CurrentValue -= damage;
        if (currentHealth.CurrentValue <= 0)
        {
            Die();
        }
    }

    private void Die()
    {
        Debug.Log("Die");
        onPlayerDeath.Raise();
        this.gameObject.transform.Rotate(0f, 0f, 45f);
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
