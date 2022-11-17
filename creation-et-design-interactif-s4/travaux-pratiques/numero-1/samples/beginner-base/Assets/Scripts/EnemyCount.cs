using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class EnemyCount : MonoBehaviour
{
    // Start is called before the first frame update

    public TextMeshProUGUI text;
    int numberOfEnemies = 0;
     
    void Start()
    {
         GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
         numberOfEnemies = enemies.Length;
         text.text = $"Nombre ennemis restants : {numberOfEnemies}";
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void UpdateEnemiesCount() {
        numberOfEnemies -= 1;
        text.text = $"Nombre ennemis restants : {numberOfEnemies}";
    }
}
