using UnityEngine;
using System.Collections;

public class Knockback : MonoBehaviour
{
    public Rigidbody2D rb;
    public GameObject effect;

    private void Start() {
        ToggleEffect(false);
    }

    public void Apply(Vector3 direction, float strength, float duration = 0.95f)
    {
        rb.linearVelocity = Vector2.zero;
        rb.AddForce(direction * strength * rb.mass, ForceMode2D.Impulse);
        StartCoroutine(DisableControls(duration));
    }

    private IEnumerator DisableControls(float duration = 0.95f)
    {
        if (TryGetComponent(out PlayerMovement playerMovement))
        {
            playerMovement.isStunned = true;
            ToggleEffect(true);
            yield return new WaitForSeconds(duration);
            ToggleEffect(false);
            playerMovement.isStunned = false;
        }
    }

    private void ToggleEffect(bool isActive) {
        if(effect != null) {
            effect.GetComponent<StunEffectManager>().ToggleVisiblity(isActive);
        }
    }
}
