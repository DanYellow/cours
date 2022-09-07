using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerInventory : MonoBehaviour
{
    private int coinsCount;
    private Key currentKey = null;

    // public static PlayerInventory instance;

    static PlayerInventory _instance;
    public static PlayerInventory instance { get { return _instance; } }

    public delegate void OnUpdateCoinsDelegate(int coin);

    public OnUpdateCoinsDelegate onUpdateCoins;

    private void Awake()
    {
        if (_instance != null)
        {
            Debug.LogWarning("Il y a plus d'une instance de " + GetType().Name + " dans la scène");
            return;
        }
        _instance = this;
    }

    public int GetCoins()
    {
        return coinsCount;
    }

    public void AddCoins(int coin)
    {
        coinsCount += coin;
        onUpdateCoins?.Invoke(coinsCount);
    }

    public void SetKey(Key key)
    {
        currentKey = key;
    }

    public Key GetKey()
    {
        return currentKey;
    }
}
