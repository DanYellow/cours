using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;
    public Animator animator;

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
        if (Input.GetKeyDown(KeyCode.F9))
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
        transform.Rotate(0f, 0f, 45f);
        animator.SetTrigger("OnPlayerDeath");
    }

    public void AlertObservers(AnimationCallback animationCallback = AnimationCallback.None)
    {
        if (animationCallback == AnimationCallback.Death)
        {
            gameObject.GetComponent<SpriteRenderer>().enabled = false;
        }
    }
}
