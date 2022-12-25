using UnityEngine;
using System.Collections;

public class Knockback : MonoBehaviour
{
    public Rigidbody2D rb;
    public ShakeTypeVariable shakeType = null;

    public void Knockbacked(Vector3 direction, float strength)
    {
        rb.MovePosition(transform.position + direction * strength);
        StartCoroutine(DisableControls());
        StartCoroutine(Shake(shakeType.Duration, shakeType.Magnitude));
    }

    private IEnumerator Shake(float duration, float magnitude)
    {
        Vector3 orignalPosition = transform.position;
        float elapsed = 0f;

        while (elapsed < duration)
        {
            Vector3 shakeVector = (Random.insideUnitSphere / 2) * magnitude;

            transform.position = new Vector3(
                shakeVector.x + orignalPosition.x, shakeVector.y + orignalPosition.y, orignalPosition.z);
            elapsed += Time.deltaTime;
            yield return 0;
        }
        transform.position = orignalPosition;
    }

    IEnumerator DisableControls()
    {
        if (TryGetComponent<PlayerMovement>(out PlayerMovement playerMovement))
        {
            playerMovement.enabled = false;
            yield return new WaitForSeconds(0.20f);
            playerMovement.enabled = true;
        }
    }
}
