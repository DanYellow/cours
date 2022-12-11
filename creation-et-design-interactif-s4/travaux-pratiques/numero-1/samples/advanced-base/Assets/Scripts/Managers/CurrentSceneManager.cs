using UnityEngine;
using UnityEngine.SceneManagement;

public class CurrentSceneManager : MonoBehaviour
{
    public VoidEventChannelSO onRespawnSO;
    void Update()
    {
        #if UNITY_EDITOR
        if (Input.GetKeyDown(KeyCode.R))
        {
            Time.timeScale = 1f;
            RestartLevel();
        }

        if (Input.GetKeyDown(KeyCode.F8))
        {
            RestartLastCheckpoint();
        }
        #endif
    }

    public void LoadScene(string sceneName)
    {
        SceneManager.LoadScene(sceneName);
    }

    public void RestartLevel()
    {
        SceneManager.LoadScene(SceneManager.GetActiveScene().name);
    }

    public void RestartLastCheckpoint() {
        onRespawnSO.Raise();
        // Refill life
        // Position to last checkpoint
        // Reset objects ?
        // Remove menu
    }

    public void GameOverScreen()
    {
        Debug.Log("Display Gameover");
        // SceneManager.LoadScene("GameOver");
    }

    public void QuitGame()
    {
        Application.Quit();
    }
}
