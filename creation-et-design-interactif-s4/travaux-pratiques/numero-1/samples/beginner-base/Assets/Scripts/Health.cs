using UnityEngine;
using System.Collections;
// https://www.youtube.com/watch?v=cruE--5ML_Q
public class Health : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;
    public VoidEventChannelSO onPlayerDamage;

    public SpriteRenderer spriteRenderer;

    private bool isInvincible = false;

    float invincibilityFlashInterval = 0.2f;
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

        if (Input.GetKeyDown(KeyCode.H))
        {
            TakeDamage(1);
        }
    }

    public void TakeDamage(float damage)
    {
        if(isInvincible) {
            return;
        }
        if (currentHealth.CurrentValue <= 0)
        {
            Die();
        }
        else
        {
        currentHealth.CurrentValue -= damage;
        onPlayerDamage.Raise();
        //  currentHealth.CurrentValue = Mathf.Clamp(currentHealth.CurrentValue - damage, 0, maxHealth.CurrentValue);
            StartCoroutine(HandleInvincibilityDelay());
            StartCoroutine(InvincibilityFlash());
        }
    }

    private void Die()
    {
        onPlayerDeath.Raise();
        this.gameObject.transform.Rotate(0f, 0f, 45f);
    }

    public IEnumerator InvincibilityFlash()
    {

        while (isInvincible)
        {
            spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
            yield return new WaitForSeconds(invincibilityFlashInterval);
            spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
            yield return new WaitForSeconds(invincibilityFlashInterval);
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
