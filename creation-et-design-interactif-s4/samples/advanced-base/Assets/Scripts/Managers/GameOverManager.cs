using UnityEngine;

public class GameOverManager : MonoBehaviour
{
    [Header("Listen to event channels")]
    public VoidEventChannel onPlayerDeath;

    private void OnEnable()
    {
        onPlayerDeath.OnEventRaised += OnGameOver;
    }

    public void OnGameOver()
    {
        Debug.Log("GameOver !");
    }

    private void OnDisable()
    {
        onPlayerDeath.OnEventRaised -= OnGameOver;
    }
}
