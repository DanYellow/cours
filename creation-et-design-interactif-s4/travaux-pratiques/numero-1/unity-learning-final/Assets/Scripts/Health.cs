using UnityEngine;

public class Health : MonoBehaviour
{
    [SerializeField]
    private float _maxHealth = 10;
    private float _currentHealth;

    public delegate void OnDieDelegate();
    public OnDieDelegate onDie;

    public delegate void OnDamageDelegate();
    public OnDamageDelegate onDamage;

    public HUD heathInfo;

    void Start()
    {
        _currentHealth = _maxHealth;
        UpdateHeathInfo(_maxHealth);
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
        UpdateHeathInfo(_currentHealth);
        onDamage?.Invoke();
        if (_currentHealth <= 0)
        {
            onDie?.Invoke();
        }
    }
    public void SetHealth(float health)
    {
        if(_currentHealth >= _maxHealth) return;
        _currentHealth += health;
        UpdateHeathInfo(_currentHealth);
    }

    public float GetHealth()
    {
        return _currentHealth;
    }

    public void UpdateHeathInfo(float health)
    {
        if (heathInfo != null)
        {
            heathInfo.SetHealth(health);
        }
    }
}
