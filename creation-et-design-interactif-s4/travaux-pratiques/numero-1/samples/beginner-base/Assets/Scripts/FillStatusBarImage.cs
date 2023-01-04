using UnityEngine;
using UnityEngine.UI;
using System.Collections;

// https://www.youtube.com/watch?v=cruE--5ML_Q


[AddComponentMenu("My Special Component")]
public class FillStatusBarImage : MonoBehaviour
{
    public Image fillImage;
    public Gradient gradient;

    public FloatVariable maxHealth;
    public FloatVariable currentHealth;

    private float damagedHealthFadeTimer;

    private float currentHealthVal;

    private void Start()
    {
        currentHealthVal = currentHealth.CurrentValue;
    }

    // Update is called once per frame
    void Update()
    {
        float fillValue = currentHealth.CurrentValue / maxHealth.CurrentValue;
        fillImage.fillAmount = fillValue;

        fillImage.color = gradient.Evaluate(fillValue);
    }

    public void SetHealth(float healthNormalized)
    {
        fillImage.fillAmount = healthNormalized;
        fillImage.color = gradient.Evaluate(healthNormalized);
    }
}
