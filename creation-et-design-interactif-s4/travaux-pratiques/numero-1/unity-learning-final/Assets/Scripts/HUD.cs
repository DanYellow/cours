using UnityEngine;
using UnityEngine.UI;

public class HUD : MonoBehaviour
{
    public Sprite fullHeart;
    public Sprite halfHeart;
    public Sprite emptyHeart;

    public Text coinCount;

    Image[] _listHeartsContainers = new Image[] { };
    Animation[] listHeartsAnimation = new Animation[] { };

    private void Awake()
    {
        GameObject healthBar = transform.Find("HealthBar").gameObject;
        _listHeartsContainers = healthBar.GetComponentsInChildren<Image>();
        listHeartsAnimation = GetComponentsInChildren<Animation>();

        PlayerInventory.instance.onUpdateCoins += SetCoinCount;
    }

    public void SetHealth(float health)
    {
        bool isInt = health == (int)health;
        float currentHealth = Mathf.Ceil(health);

        for (var i = (int)currentHealth - 1; i < _listHeartsContainers.Length; i++)
        {
            if (i == (currentHealth - 1) && !isInt)
            {
                _listHeartsContainers[i].sprite = halfHeart;
                // listHeartsAnimation[i].Play();
            }
            else if (i < currentHealth)
            {
                _listHeartsContainers[i].sprite = fullHeart;
                // listHeartsAnimation[i].Play();
            }
            else
            {
                _listHeartsContainers[i].sprite = emptyHeart;
            }

            // Debug.Log("i " + i + " " + _listHeartsContainers.Length);
            // if (i == _listHeartsContainers.Length - 1 && (_listHeartsContainers[i].sprite == halfHeart || _listHeartsContainers[i].sprite == fullHeart)) {
            //     Debug.Log("ffff " + listHeartsAnimation[i].gameObject);
            //     // listHeartsAnimation[i].gameObject.SetActive(false);
            //     listHeartsAnimation[i].gameObject.transform.localScale = new Vector3(2.9f, 2.9f, 2.9f);
            // }
        }
    }

    private void OnDestroy()
    {
        PlayerInventory.instance.onUpdateCoins -= SetCoinCount;
    }

    public void SetCoinCount(int coin)
    {
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