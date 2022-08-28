using UnityEngine;

public class Health : MonoBehaviour
{
    private int _maxHealth;
    public int currentHealth = 10;

    public delegate void OnDieDelegate();
    public OnDieDelegate onDie;

    public delegate void OnHitDelegate();
    public OnHitDelegate onHit;

    void Start()
    {
        currentHealth = _maxHealth;
    }

    public void TakeDamage(int damage)
    {
        currentHealth -= damage;

        onHit?.Invoke();
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
