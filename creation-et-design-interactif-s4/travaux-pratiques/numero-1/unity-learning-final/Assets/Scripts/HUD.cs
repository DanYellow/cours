using UnityEngine;
using UnityEngine.UI;

public class HUD : MonoBehaviour
{
    public Sprite fullHeart;
    public Sprite halfHeart;
    public Sprite emptyHeart;

    public Text coinCount;

    Image[] _listHeartsContainers = new Image[] { };

    void OnEnable()
    {
        PlayerInventory.instance.onUpdateCoins += SetCoinCount;
    }   

    private void Awake()
    {
        GameObject healthBar = transform.Find("HealthBar").gameObject;
        _listHeartsContainers = healthBar.GetComponentsInChildren<Image>();        
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

    private void OnDisable()
    {
        PlayerInventory.instance.onUpdateCoins -= SetCoinCount;
    }

    public void SetCoinCount(int coin) {
        coinCount.text = coin.ToString();
    }
}


// public class Rotate : MonoBehaviour
// {
//     [SerializeField] private float speed = 2f;

//     private void Update()
//     {
//         transform.Rotate(0, 0, 360 * speed * Time.deltaTime);
//     }
// }