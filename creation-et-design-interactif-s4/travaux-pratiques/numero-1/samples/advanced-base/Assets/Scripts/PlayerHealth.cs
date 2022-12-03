using UnityEngine;

public class PlayerHealth : MonoBehaviour
{
    public FloatVariable currentHealth;
    public FloatVariable maxHealth;

    public VoidEventChannelSO onPlayerDeath;
    public Animator animator;

    public bool needResetHP = true;

    public enum AnimationCallback
    {
        Death,
        None
    }

    Rigidbody2D rb;


    private void Awake()
    {
        if (needResetHP)
        {
            currentHealth.CurrentValue = maxHealth.CurrentValue;
        }

        rb = GetComponent<Rigidbody2D>();
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

    // private void OnCollisionStay2D(Collision2D other)
    // {
    //     if (
    //        other.gameObject.CompareTag("Saw")
    //        )
    //     {
    //         ContactPoint2D[] contacts = new ContactPoint2D[10];

    //         other.GetContacts(contacts);

    //         foreach (ContactPoint2D contact in contacts)
    //         {
    //             Debug.Log(contact.normal.y);
    //             if (
    //             // (contact.normal.x < -0.5 && contact.normalImpulse > 1000) ||
    //             // (contact.normal.x > 0.5 && contact.normalImpulse > 1000) ||
    //             // From top 
    //             // (contact.normal.y < -0.5 && contact.normalImpulse > 1000) ||
    //             // Collide to roof
    //             (contact.normal.y > 0.5 && contact.normalImpulse > 1000)
    //             )
    //             {
    //                 Debug.Log("test " + contact.normalImpulse);
    //                 Debug.Break();
    //             }
    //         }
    //     }
    // }
}
