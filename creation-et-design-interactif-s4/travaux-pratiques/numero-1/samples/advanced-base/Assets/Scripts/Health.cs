using UnityEngine;

public class Health : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;

    public enum AnimationCallback
    {
        Death,
        None
    }


    private void Start()
    {
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

    public void AlertObservers(AnimationCallback animationCallback = AnimationCallback.None)
    {
        if (animationCallback == AnimationCallback.Death)
        {
            gameObject.GetComponent<SpriteRenderer>().enabled = false;
            // Do other things based on an attack ending.
        }
    }
}
