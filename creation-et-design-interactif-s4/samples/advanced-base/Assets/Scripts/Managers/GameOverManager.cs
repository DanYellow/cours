using UnityEngine;

public class GameOverManager : MonoBehaviour
{
    public VoidEventChannelSO onPlayerDeath;

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
