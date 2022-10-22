using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Health : MonoBehaviour
{
    public FloatVariable maxHealth;
    // public FloatVariable currentHealth;

    // public float maxHealth;
    public float currentHealth;

    private void Start() {
        currentHealth = maxHealth.Value;
    }

    public void TakeDamage(float damage) {
        currentHealth -= damage;
    }
}
