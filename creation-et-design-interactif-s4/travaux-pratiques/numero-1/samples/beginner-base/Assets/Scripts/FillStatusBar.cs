using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class FillStatusBar : MonoBehaviour
{
    public Health playerHealth;
    public Image fillImage;
    public Slider slider;
    public Gradient gradient; 

    // Update is called once per frame
    void Update()
    {
        float fillValue = playerHealth.currentHealth / playerHealth.maxHealth.Value;
        slider.value = fillValue;

        fillImage.color = gradient.Evaluate(fillValue);
    }
}
