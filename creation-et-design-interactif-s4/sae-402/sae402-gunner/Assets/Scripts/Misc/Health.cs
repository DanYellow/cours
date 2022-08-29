using UnityEngine;

public class Health : MonoBehaviour
{
    [SerializeField]
    private int _maxHealth = 10;
    private int _currentHealth = 10;

    public delegate void OnDieDelegate();
    public OnDieDelegate onDie;

    public delegate void OnHitDelegate();
    public OnHitDelegate onHit;

    void Start()
    {
        _currentHealth = _maxHealth;
    }

    public void TakeDamage(int damage)
    {
        _currentHealth -= damage;

        onHit?.Invoke();
        if (_currentHealth <= 0)
        {
            onDie?.Invoke();
        }
    }
    public void SetHealth(int health)
    {
        _currentHealth += health;
    }

    public int GetHealth() {
        return _currentHealth;
    }
}
