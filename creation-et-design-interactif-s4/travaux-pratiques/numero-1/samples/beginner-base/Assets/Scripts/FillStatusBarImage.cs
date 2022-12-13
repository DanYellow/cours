using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class FillStatusBarImage : MonoBehaviour
{
    public Image fillImage;
    public Image damageImage;
    public Gradient gradient;

    public FloatVariable maxHealth;
    public FloatVariable currentHealth;

    private float damagedHealthFadeTimer;
    private Color damageColor;

    private float currentHealthVal;

    private void Start()
    {

        damageImage.CrossFadeAlpha(0f, 0f, false);
        // damageColor = damageImage.color;
        // damageColor.a = 0f;
        // damageImage.color = damageColor;
        currentHealthVal = currentHealth.CurrentValue;
    }

    // Update is called once per frame
    void Update()
    {
        float fillValue = currentHealth.CurrentValue / maxHealth.CurrentValue;
        fillImage.fillAmount = fillValue;

        fillImage.color = gradient.Evaluate(fillValue);

        if (damageColor.a > 0 && currentHealthVal != currentHealth.CurrentValue)
        {
            
            damagedHealthFadeTimer -= Time.deltaTime;
            StartCoroutine(UpdateDamageBar());
            if (damagedHealthFadeTimer < 0)
            {
                // float fadeAmount = 5f;
                // damageColor.a -= (fadeAmount * Time.deltaTime);
                // damageImage.color = damageColor;

                // damageImage.fillAmount = fillImage.fillAmount;
            }
        }

        if (currentHealthVal == currentHealth.CurrentValue)
        {
            Debug.Log("currentHealthVal");
            damageColor.a = 1f;
             damageImage.CrossFadeAlpha(1f, 0f, false);
            damageImage.fillAmount = fillImage.fillAmount;
            // damageImage.color = damageColor;
        }
    }

    IEnumerator UpdateDamageBar()
    {
        
        yield return new WaitForSeconds(0.5f);
        // damageColor.a = 0f;
        // damageImage.color = damageColor;
        damageImage.CrossFadeAlpha(0, 2.0f, false);
        yield return new WaitForSeconds(2f);
        currentHealthVal = currentHealth.CurrentValue;
        Debug.Log("currentHealthVal " + currentHealthVal);
        Debug.Log("currentHealth " + currentHealth.CurrentValue);
    }


    public void SetHealth(float healthNormalized)
    {
        fillImage.fillAmount = healthNormalized;
        fillImage.color = gradient.Evaluate(healthNormalized);
    }
}
