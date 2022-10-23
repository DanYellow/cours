using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Health : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    // public float maxHealth;
    // public float currentHealth;

    [InspectorName("16 bits")]
    public int test = 41;

    public VoidEventChannelSO onPlayerDeath;

    // public FillStatusBar healthBar;

    private void Start()
    {
        Debug.Log("currentHealth " + currentHealth);
        // currentHealth = maxHealth;
        currentHealth.CurrentValue = maxHealth.CurrentValue;
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
        // currentHealth -= damage;
        // healthBar.SetHealth(currentHealth / maxHealth);

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
}
