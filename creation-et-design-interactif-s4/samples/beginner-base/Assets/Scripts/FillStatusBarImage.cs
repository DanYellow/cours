using UnityEngine;
using UnityEngine.UI;
using System.Collections;

// https://www.youtube.com/watch?v=cruE--5ML_Q


public class FillStatusBarImage : MonoBehaviour
{
    public Image fillImage;
    public Gradient gradient;

    [ContextMenuItem("SetHealth", "Test")]
    public FloatVariable maxHealth;
    public FloatVariable currentHealth;

     float smoothTime = 0.5f;

    float velocity = 0;

    float storedValue;

    private void Start() {
        storedValue = currentHealth.CurrentValue / maxHealth.CurrentValue;
        SetFilling();
    }

 
    public void SetFilling()
    {
        float healthNormalized = currentHealth.CurrentValue / maxHealth.CurrentValue;

        // StopCoroutine(Animate());
        // StartCoroutine(Animate());

        fillImage.fillAmount = healthNormalized;
        fillImage.color = gradient.Evaluate(healthNormalized);
    }

    IEnumerator Animate() {
        float elapsedTime = 0f; 

        while(elapsedTime < smoothTime) {
            float lerpFactor = Mathf.SmoothStep(storedValue, currentHealth.CurrentValue / maxHealth.CurrentValue, elapsedTime / smoothTime);
            fillImage.fillAmount = lerpFactor;
            elapsedTime += Time.deltaTime;

            yield return null;
        }

        storedValue = currentHealth.CurrentValue / maxHealth.CurrentValue;
    }
}
