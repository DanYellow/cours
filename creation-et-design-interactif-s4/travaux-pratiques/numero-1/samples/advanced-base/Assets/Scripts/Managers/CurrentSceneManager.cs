using UnityEngine;
using UnityEngine.SceneManagement;

public class CurrentSceneManager : MonoBehaviour
{
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
        Debug.Log("RestartLastCheckpoint");
        // Refill life to full
        // Position to last checkpoint
        // Reset objects ?
        // Remove menu
        // Reset Rigidbody
        // Reactivate Player movements
        // Reset isFacingRight
        // Reset Player's rotation
    }

    public void GameOverScreen()
    {
        Debug.Log("GameOverScreen");
        // SceneManager.LoadScene("GameOver");
    }

    public void QuitGame()
    {
        Application.Quit();
    }
}
