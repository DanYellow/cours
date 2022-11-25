using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FillStatusBar : MonoBehaviour
{
    public Image fillImage;
    public Slider slider;
    public Gradient gradient;

    public FloatVariable maxHealth;
    public FloatVariable currentHealth;

    // Update is called once per frame
    void Update()
    {
        float fillValue = currentHealth.CurrentValue / maxHealth.CurrentValue;
        slider.value = fillValue;

        fillImage.color = gradient.Evaluate(fillValue);
    }

    public void SetHealth(float healthNormalized)
    {
        slider.value = healthNormalized;

        fillImage.color = gradient.Evaluate(healthNormalized);
    }
}
