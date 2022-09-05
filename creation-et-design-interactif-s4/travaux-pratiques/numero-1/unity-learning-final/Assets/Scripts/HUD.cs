using UnityEngine;
using UnityEngine.UI;

public class HUD : MonoBehaviour
{
    public Sprite fullHeart;
    public Sprite halfHeart;
    public Sprite emptyHeart;

    public Text coinCount;

    Image[] _listHeartsContainers = new Image[] { };

    private void Awake()
    {
        GameObject healthBar = transform.Find("HealthBar").gameObject;
        _listHeartsContainers = healthBar.GetComponentsInChildren<Image>();

        PlayerInventory.instance.onUpdateCoins += SetCoinCount;
    }

    public void SetHealth(float health)
    {
        bool isInt = health == (int)health;
        float currentHealth = Mathf.Ceil(health);

        for (var i = 0; i < _listHeartsContainers.Length; i++)
        {
            if (i == (currentHealth - 1) && !isInt)
            {
                _listHeartsContainers[i].sprite = halfHeart;
            }
            else if (i < currentHealth)
            {
                _listHeartsContainers[i].sprite = fullHeart;
            }
            else
            {
                _listHeartsContainers[i].sprite = emptyHeart;
            }
        }
    }

    public void SetCoinCount(int coin) {
        coinCount.text = coin.ToString();
    }
}
