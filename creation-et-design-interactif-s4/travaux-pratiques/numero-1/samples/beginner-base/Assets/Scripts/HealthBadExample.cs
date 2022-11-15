using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class HealthBadExample : MonoBehaviour
{
    public float maxHealth;
    [ReadOnlyInspector]
    public float currentHealth;

    public FillStatusBarBadExample healthBar;
    public GameObject gameOverScreen;

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
    }

    public void TakeDamage(float damage)
    {
        currentHealth -= damage;
        healthBar.SetHealth(currentHealth / maxHealth);

        if (currentHealth <= 0)
        {
            Die();
        }
    }

    private void Die()
    {
        gameOverScreen.SetActive(true);
        this.gameObject.transform.Rotate(0f, 0f, 45f);
    }
}
