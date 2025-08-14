using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;

public class EnemyCount : MonoBehaviour
{
    public TextMeshProUGUI text;
    int numberOfEnemies = 0;
     
    void Start()
    {
        // FindGameObjectsWithTag() est plus efficace que Find()
        // https://docs.unity3d.com/ScriptReference/GameObject.Find.html
         GameObject[] enemies = GameObject.FindGameObjectsWithTag("Enemy");
         numberOfEnemies = enemies.Length;
         text.text = $"Nombre ennemis restants : <color=#FF0000>{numberOfEnemies}</color>";
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    public void UpdateEnemiesCount() {
        numberOfEnemies -= 1;
        text.text = $"Nombre ennemis restants : <color=#FF0000>{numberOfEnemies}</color>";
    }

    public void NewEnemy() {
        numberOfEnemies += 1;
        text.text = $"Nombre ennemis restants : <color=#FF0000>{numberOfEnemies}</color>";
    }
 }
