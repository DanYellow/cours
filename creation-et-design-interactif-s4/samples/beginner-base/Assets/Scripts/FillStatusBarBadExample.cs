using UnityEngine;
using UnityEngine.UI;

public class FillStatusBarBadExample : MonoBehaviour
{
    // public Health playerHealth;
    public Image fillImage;
    public Slider slider;
    public Gradient gradient;

    // Update is called once per frame
    // void Update()
    // {
    //     float fillValue = currentHealth / maxHealth;
    //     slider.value = fillValue;

    //     fillImage.color = gradient.Evaluate(fillValue);
    // }


    public void SetHealth(float healthNormalized)
    {
        slider.value = healthNormalized;

        fillImage.color = gradient.Evaluate(healthNormalized);
    }
}
