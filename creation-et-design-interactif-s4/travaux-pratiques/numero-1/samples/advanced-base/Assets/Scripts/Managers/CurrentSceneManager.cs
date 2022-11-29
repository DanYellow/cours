using UnityEngine;
using UnityEngine.SceneManagement;

public class CurrentSceneManager : MonoBehaviour
{
    void Update()
    {
        #if UNITY_EDITOR
        if (Input.GetKeyDown(KeyCode.R))
        {
            RestartLevel();
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
