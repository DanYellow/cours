using UnityEngine;
using System.Collections;
using System;
// https://www.youtube.com/watch?v=cruE--5ML_Q
public class Health : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;
    public VoidEventChannelSO onPlayerDamage;

    // Test
    public SOFloatVariableRef floatVariableRef;

    public SpriteRenderer spriteRenderer;

    private bool isInvincible = false;

    public float invincibilityFlashInterval = 0.2f;
    public float invincibilityDuration = 3f;


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
        if (isInvincible)
        {
            return;
        }
        if (currentHealth.CurrentValue <= 0)
        {
            Die();
        }
        else
        {
            floatVariableRef.CurrentValue -= damage;
            currentHealth.CurrentValue -= damage;
            onPlayerDamage.Raise();
            //  currentHealth.CurrentValue = Mathf.Clamp(currentHealth.CurrentValue - damage, 0, maxHealth.CurrentValue);
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
        float timeElapsed = 0f;
        isInvincible = true;

        bool isVisible = true;
        float flashTimer = 0f;
        Debug.Log("oookk");
        var pauseCoroutine = new WaitForSeconds(invincibilityFlashInterval);
        // DateTime before = DateTime.Now;

        while (timeElapsed < invincibilityDuration)
        {
            timeElapsed += Time.deltaTime;
            flashTimer += Time.deltaTime;

            if (flashTimer >= invincibilityFlashInterval)
            {
                if (isVisible)
                {
                    spriteRenderer.color = new Color(1f, 1f, 1f, 0f);
                }
                else
                {
                    spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
                }

                flashTimer = 0f;
                isVisible = !isVisible;
            }

            yield return null;
        }
        // DateTime after = DateTime.Now;
        // TimeSpan duration = after.Subtract(before);
        // Debug.Log("Duration in milliseconds: " + duration.TotalMilliseconds);
        spriteRenderer.color = new Color(1f, 1f, 1f, 1f);
        isInvincible = false;
    }

    public bool IsInvincible()
    {
        return isInvincible;
    }
}
