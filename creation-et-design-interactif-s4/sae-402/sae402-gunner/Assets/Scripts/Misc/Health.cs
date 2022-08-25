using UnityEngine;

public class Health : MonoBehaviour
{
    private int _maxHealth;
    public int currentHealth;

    public delegate void OnDieDelegate();
    public OnDieDelegate onDie;

    void Start()
    {
        currentHealth = _maxHealth;
    }

    public void TakeDamage(int damage)
    {
        currentHealth -= damage;

        if (currentHealth <= 0)
        {
            onDie?.Invoke();
        }
    }

    public void SetHealth(int health)
    {
        currentHealth += health;
    }
}
