using UnityEngine;
using UnityEngine.EventSystems;

public class GameOver : MonoBehaviour
{
    public GameObject gameOverUI;
    public Health playerHealth;

    void Awake()
    {
        playerHealth.onDie += PlayerDeath;
        gameOverUI.SetActive(false);
    }

    void PlayerDeath()
    {
        gameOverUI.SetActive(true);
        EventSystem.current.SetSelectedGameObject(GameObject.Find("GameOver/Restart"));
    }

    private void OnDestroy()
    {
        playerHealth.onDie -= PlayerDeath;
    }
}
