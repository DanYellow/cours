using UnityEngine;

public class Health : MonoBehaviour
{
    [SerializeField]
    private float maxHealth = 10;
    private float _currentHealth;

    public delegate void OnDieDelegate();
    public event OnDieDelegate onDie;

    public delegate void OnDamageDelegate();
    public event OnDamageDelegate onDamage;

    void Start()
    {
        _currentHealth = maxHealth;
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.KeypadPlus))
        {
            SetHealth(0.5f);
        }

        if (Input.GetKeyDown(KeyCode.KeypadMinus))
        {
            TakeDamage(0.5f);
        }
    }

    public void TakeDamage(float damage)
    {
        _currentHealth -= damage;
        onDamage?.Invoke();
        if (_currentHealth <= 0)
        {
            onDie?.Invoke();
        }
    }
    public void SetHealth(float health)
    {
        if (_currentHealth >= maxHealth) return;
        _currentHealth += health;
    }

    public float GetHealth()
    {
        return _currentHealth;
    }

    public float GetMaxHealth()
    {
        return maxHealth;
    }
}
