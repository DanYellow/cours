using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class BossInfo : MonoBehaviour
{

    public TextMeshProUGUI  bossName;
    public Slider slider;


    private void Awake() {
        // GameObject bossName = transform.Find("BossName");
    }

    private void Start() {
        
    }

    public void SetHealth(float health, float maxHealth)
    { 
        print("Damage");
        slider.value = (health / maxHealth);
    }

    public void SetName(string name){
        bossName.SetText(name);
    }
}
