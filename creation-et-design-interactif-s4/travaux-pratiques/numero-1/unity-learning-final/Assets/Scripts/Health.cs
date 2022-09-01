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

    public HeathInfo heathInfo;

    void Start()
    {
        _currentHealth = _maxHealth;
        heathInfo.SetHealth(_maxHealth);
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
        UpdateHeathInfo();
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
        UpdateHeathInfo();
    }

    public float GetHealth()
    {
        return _currentHealth;
    }

    public void UpdateHeathInfo()
    {
        if (heathInfo != null)
        {
            heathInfo.SetHealth(_currentHealth);
        }
    }
}
