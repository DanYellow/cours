using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CurrentSceneManager : MonoBehaviour
{
    public bool isPlayerHereByDefault = false;
    public Vector3 respawnPoint;
    public static CurrentSceneManager instance;

    private void Awake()
    {
        if (instance != null)
        {
            Debug.LogWarning("Il y a plus d'une instance de " + GetType().Name + " dans la scène");
            return;
        }

        instance = this;
        respawnPoint = GameObject.FindGameObjectWithTag("Player").transform.position;
    }
}
