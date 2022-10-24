using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Health : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;


    private void Start()
    {
        Debug.Log("currentHealth " + currentHealth);
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
        currentHealth.CurrentValue -= damage;
        if (currentHealth.CurrentValue <= 0)
        {
            Die();
        }
    }

    private void Die()
    {
        onPlayerDeath.Raise();
        this.gameObject.transform.Rotate(0f, 0f, 45f);
        gameObject.GetComponent<Animator>().SetTrigger("OnPlayerDeath");
    }
}
