using UnityEngine;

public class PowerUp : MonoBehaviour
{
    public PowerUpData powerUpData;

    private SpriteRenderer _sprite;

    private PlayerListSkills _listSkills;

    private GameObject _powerUpPanel;

    public delegate void OnPickupDelegate(PowerUpData powerUpData);
    public static OnPickupDelegate onPickup;


    void Awake()
    {
        _sprite = GetComponent<SpriteRenderer>();
        _sprite.sprite = powerUpData.sprite;
        _listSkills = PlayerListSkills.GetInstance();

        _powerUpPanel = GameObject.Find("PowerUpPanel");
    }


    void OnTriggerEnter2D(Collider2D collider)
    {
        if (collider.CompareTag("Player"))
        {
            Pickup(collider);
        }
    }

    void Pickup(Collider2D player)
    {
        _listSkills.UnlockSkill(powerUpData.skill);
        if(!_listSkills.IsSkillUnlocked(powerUpData.skill)) {
            onPickup?.Invoke(powerUpData);
        }

        Destroy(gameObject);
    }
}
