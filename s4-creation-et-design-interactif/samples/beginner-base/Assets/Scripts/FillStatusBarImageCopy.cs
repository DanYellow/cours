using UnityEngine;
using UnityEngine.UI;
using System.Collections;

// No used
public class FillStatusBarImageCopy : MonoBehaviour
{
    public Image fillImage;
    public Image damageImage;
    public Gradient gradient;

    public FloatVariable maxHealth;
    public Enemy enemy;

    private float damagedHealthFadeTimer;
    private Color damageColor;

    private float currentHealth;


    private void Start()
    {
        damageImage.CrossFadeAlpha(0f, 0f, false);

        currentHealth = maxHealth.CurrentValue;
    }

    // Update is called once per frame
    void Update()
    {
        float fillValue = Mathf.Clamp01(enemy.currentHealth / maxHealth.CurrentValue);
        fillImage.fillAmount = fillValue;

        fillImage.color = gradient.Evaluate(fillValue);

        if (damageImage.color.a > 0 && currentHealth != enemy.currentHealth)
        {
            damagedHealthFadeTimer -= Time.deltaTime;
            StartCoroutine(UpdateDamageBar());
        }

        if (currentHealth == enemy.currentHealth)
        {
            damageImage.CrossFadeAlpha(1f, 0f, false);
            damageImage.fillAmount = fillImage.fillAmount;
        }
    }

    IEnumerator UpdateDamageBar()
    {
        yield return new WaitForSeconds(0.5f);
        damageImage.CrossFadeAlpha(0, 2.0f, false);
        yield return new WaitForSeconds(2f);
        damageImage.fillAmount = fillImage.fillAmount;
        currentHealth = enemy.currentHealth;
    }


    public void SetHealth(float healthNormalized)
    {
        fillImage.fillAmount = healthNormalized;
        fillImage.color = gradient.Evaluate(healthNormalized);
    }
}
