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

    public ScriptableObj.Health health1;

    private void Awake()
    {
        GameObject healthBar = transform.Find("HealthBar").gameObject;
        _listHeartsContainers = healthBar.GetComponentsInChildren<Image>();
        listHeartsAnimation = GetComponentsInChildren<Animation>();

        SetHealth(health1.GetHealth());
    }

    void Start() {
        PlayerInventory.instance.onUpdateCoins += SetCoinCount;
    }

    private void Update() {
        SetHealth(health1.GetHealth());
    }

    public void SetHealth(float health)
    {
        bool isInt = health == (int)health;
        float currentHealth = Mathf.Ceil(health);

        int index = (int)currentHealth - 1;
        if (index < 0) {
            index = 0;
        }

        for (var i = index; i < _listHeartsContainers.Length; i++)
        {
            if (i == (currentHealth - 1) && !isInt)
            {
                _listHeartsContainers[i].sprite = halfHeart;
                listHeartsAnimation[i].Play();
            }
            else if (i < currentHealth)
            {
                _listHeartsContainers[i].sprite = fullHeart;
                listHeartsAnimation[i].Play();
            }
            else
            {
                _listHeartsContainers[i].sprite = emptyHeart;
            }
        }
    }

    private void OnDestroy()
    {
        // PlayerInventory.instance.onUpdateCoins -= SetCoinCount;
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