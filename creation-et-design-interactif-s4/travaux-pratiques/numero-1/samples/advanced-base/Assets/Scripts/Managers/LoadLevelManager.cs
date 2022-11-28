using UnityEngine;
using UnityEngine.SceneManagement;

public class LoadLevelManager : MonoBehaviour
{
    public Vector2 currentCheckpoint;

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

    public void SetCheckpoint(GameObject go)
    {
        currentCheckpoint = go.transform.position;
    }

    public void QuitGame()
    {
        Application.Quit();
    }
}
