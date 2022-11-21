using UnityEngine;

public class Health : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;

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

        if (Input.GetKeyDown(KeyCode.M))
        {
            TakeDamage(10);
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
        Debug.Log("Die");
        onPlayerDeath.Raise();
        this.gameObject.transform.Rotate(0f, 0f, 45f);
    }
}
