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

 
    public void SetFilling()
    {
        float healthNormalized = currentHealth.CurrentValue / maxHealth.CurrentValue;
        fillImage.fillAmount = healthNormalized;
        fillImage.color = gradient.Evaluate(healthNormalized);
    }
}
