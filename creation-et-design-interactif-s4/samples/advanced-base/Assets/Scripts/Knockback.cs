using UnityEngine;
using System.Collections;

public class Knockback : MonoBehaviour
{
    public Rigidbody2D rb;
    public GameObject effect;

    private void Start() {
        ToggleEffect(false);
    }

    public void Knockbacked(Vector3 direction, float strength)
    {
        rb.MovePosition(transform.position + direction * strength);
        StartCoroutine(DisableControls());
    }

    IEnumerator DisableControls()
    {
        if (TryGetComponent<PlayerMovement>(out PlayerMovement playerMovement))
        {
            playerMovement.enabled = false;
            ToggleEffect(true);
            yield return new WaitForSeconds(0.5f);
            ToggleEffect(false);
            playerMovement.enabled = true;
        }
    }

    private void ToggleEffect(bool isActive) {
        if(effect != null) {
            effect.GetComponent<StunEffectManager>().ToggleVisiblity(isActive);
        }
    }
}
